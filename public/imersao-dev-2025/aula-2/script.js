document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.querySelector('.search-bar button');
  const searchInput = document.querySelector('.search-bar input');
  const mainContent = document.querySelector('main');
  const languageTagsContainer = document.querySelector('.language-tags');
  let articleContainer = document.getElementById('initial-content');

  // 🔹 Aqui vamos armazenar o conteúdo do data.json
  let techData = [];

  const normalize = (str) =>
    (str || '').toString().trim().toLowerCase();

  const loadTechData = async () => {
    try {
      // ajuste o caminho se precisar: '/assets/data.json', etc.
      const res = await fetch('./data.json');
      if (!res.ok) {
        console.error('Falha ao carregar data.json:', res.status, res.statusText);
        return [];
      }
      const json = await res.json();
      if (!Array.isArray(json)) {
        console.error('data.json não é um array, verifique o formato.');
        return [];
      }
      return json;
    } catch (err) {
      console.error('Erro ao buscar data.json:', err);
      return [];
    }
  };

  const findTechByLanguage = (language) => {
    const langNorm = normalize(language);

    if (!langNorm) return null;

    // alguns aliases simples
    const aliasMap = {
      js: 'javascript',
      ts: 'typescript',
      'c#': 'c#',
      'c++': 'c++',
      'node': 'node.js',
      'nodejs': 'node.js',
      'html': 'html5',
      'css': 'css3'
    };

    const mappedLang = aliasMap[langNorm] || langNorm;

    return (
      techData.find((t) => normalize(t.label) === mappedLang) ||
      techData.find((t) => normalize(t.query) === mappedLang)
    );
  };

  const createTagElement = (item) => {
    const tag = document.createElement('a');
    tag.href = '#';
    tag.className = 'language-tag';
    tag.dataset.query = item.query || item.label;
    tag.title = `Buscar por ${item.label}`;

    const iconWrapper = document.createElement('span');
    iconWrapper.className = 'tag-icon';

    if (item.icon) {
      const img = document.createElement('img');
      img.src = item.icon;
      img.alt = item.alt || `Logo de ${item.label}`;
      img.loading = 'lazy';
      img.decoding = 'async';
      iconWrapper.appendChild(img);
    } else {
      iconWrapper.classList.add('tag-icon--fallback');
      iconWrapper.textContent =
        item.initials || item.label.slice(0, 3).toUpperCase();
      iconWrapper.setAttribute('aria-hidden', 'true');
    }

    const label = document.createElement('span');
    label.textContent = item.label;

    tag.appendChild(iconWrapper);
    tag.appendChild(label);

    tag.addEventListener('click', (event) => {
      event.preventDefault();
      handleSearch(item.query || item.label);
    });

    return tag;
  };

  const loadQuickLinks = () => {
    if (!languageTagsContainer) return;

    languageTagsContainer.innerHTML = '';

    // Se quiser limitar a quantidade exibida, pode fazer um slice aqui
    techData.forEach((item) => {
      languageTagsContainer.appendChild(createTagElement(item));
    });
  };

  const renderResult = ({ query, answer, docsUrl, language }) => {
    if (!articleContainer || !mainContent.contains(articleContainer)) {
      articleContainer = document.createElement('div');
      mainContent.prepend(articleContainer);
    }

    const docLinkMarkup = docsUrl
      ? `<p class="doc-link">
           <b>Documentação Oficial:</b>
           <a href="${docsUrl}" target="_blank" rel="noopener noreferrer">
             ${docsUrl}
           </a>
         </p>`
      : '';

    let helloWorldMarkup = '';

    if (language) {
      const tech = findTechByLanguage(language);
      const snippetHtml = tech?.snippet_html;

      if (snippetHtml) {
        // snippet_html já vem com spans (.keyword, .string, etc.)
        helloWorldMarkup = `
          <section class="code-example">
            <h3>Exemplo clássico em ${tech.label}</h3>
            <pre class="code-block"><code>${snippetHtml}</code></pre>
          </section>
        `;
      }
    }

    articleContainer.innerHTML = `
      <div class="hero-copy">
        <a href="https://henriquesilva.dev/imersao-dev-2025/aula-2/" class="hero-kicker">Voltar a Info</a>

        <h2>Resultado para "${query}"</h2>
        <p class="hero-lead">${answer || ''}</p>
        ${docLinkMarkup}
        ${helloWorldMarkup}
      </div>      
      `;
  };

  const handleSearch = async (predefinedQuery) => {
    const query = predefinedQuery || searchInput.value.trim();
    if (!query) return;

    searchInput.value = `O que é ${query}?`;

    if (!articleContainer || !mainContent.contains(articleContainer)) {
      articleContainer = document.createElement('div');
      mainContent.prepend(articleContainer);
    }

    articleContainer.innerHTML = '<p class="loading">Buscando...</p>';

    try {
      const response = await fetch(
        'https://base-conhecimento-api-m3db.onrender.com/chat',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `O que é ${query}?` })
        }
      );

      const data = await response.json();

      const answer = data.answer || '';
      const firstSource = data?.sources?.[0] || null;
      const docsUrl = firstSource?.metadata?.docs_url || null;
      const language = firstSource?.metadata?.language || null;

      renderResult({ query, answer, docsUrl, language });
    } catch (error) {
      articleContainer.innerHTML =
        '<p class="error">Houve um erro ao buscar. Tente novamente.</p>';
      console.error('Erro na busca:', error);
    }
  };

  const init = async () => {
    techData = await loadTechData();
    loadQuickLinks();
  };

  // Eventos de busca
  searchButton?.addEventListener('click', () => handleSearch());

  searchInput?.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });

  // Inicializa carregando o data.json e montando as tags
  init();
});
