// chat-widget.js
document.addEventListener("DOMContentLoaded", () => {
  // === BOTÃO FLUTUANTE ===
  const chatButton = document.createElement("button");
  chatButton.className = "chat-fab";
  chatButton.setAttribute("aria-label", "Abrir chat CodeImaginBot");
  chatButton.innerHTML = "💬";

  document.body.appendChild(chatButton);

  // === MODAL / JANELA DE CHAT ===
  const chatModal = document.createElement("div");
  chatModal.className = "chat-modal hidden";
  chatModal.setAttribute("role", "dialog");
  chatModal.setAttribute("aria-label", "Chat com CodeImaginBot");

  chatModal.innerHTML = `
    <div class="chat-modal-header">
      <div>
        <strong>CodeImaginBot</strong>
        <p class="chat-modal-subtitle">Seu assistente de código com Gemini</p>
      </div>
      <button class="chat-modal-close" aria-label="Fechar chat">×</button>
    </div>
    <div class="chat-modal-messages" id="chatMessages">
      <div class="chat-message bot">
        <div class="chat-bubble">
          Olá! Eu sou o <strong>CodeImaginBot</strong> 🤖<br />
          Como posso te ajudar a explorar linguagens e tecnologias hoje?
        </div>
      </div>
    </div>
    <form class="chat-modal-form" id="chatForm">
      <input
        type="text"
        id="chatInput"
        placeholder="Pergunte algo sobre código ou tecnologia..."
        autocomplete="off"
        required
      />
      <button type="submit">Enviar</button>
    </form>
  `;

  document.body.appendChild(chatModal);

  const closeButton = chatModal.querySelector(".chat-modal-close");
  const messagesEl = chatModal.querySelector("#chatMessages");
  const formEl = chatModal.querySelector("#chatForm");
  const inputEl = chatModal.querySelector("#chatInput");

  // === FUNÇÕES AUXILIARES ===
  function toggleChat() {
    chatModal.classList.toggle("hidden");
    if (!chatModal.classList.contains("hidden")) {
      inputEl.focus();
    }
  }

  function appendMessage(text, from = "user") {
    const wrapper = document.createElement("div");
    wrapper.className = `chat-message ${from}`;

    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    bubble.innerHTML = text;

    wrapper.appendChild(bubble);
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function appendLoading() {
    const wrapper = document.createElement("div");
    wrapper.className = "chat-message bot loading";
    wrapper.innerHTML = `
      <div class="chat-bubble">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    messagesEl.appendChild(wrapper);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return wrapper;
  }

  // === EVENTOS ===
  chatButton.addEventListener("click", toggleChat);
  closeButton.addEventListener("click", toggleChat);

  formEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = inputEl.value.trim();
    if (!message) return;

    appendMessage(message, "user");
    inputEl.value = "";

    const loadingEl = appendLoading();

    try {
      // 🔧 TODO: aqui você integra com o backend/Gemini
      // Exemplo: faça uma requisição para sua API:
      //
      // const response = await fetch("/api/codeimaginbot", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message }),
      // });
      // const data = await response.json();
      // const botText = data.reply || "Não consegui entender muito bem isso, pode reformular? 🙂";

      // Por enquanto, resposta mock:
      await new Promise((res) => setTimeout(res, 800));
      const botText = `Você disse: <code>${message}</code><br/>Em breve vou responder isso usando o Gemini 😄`;

      loadingEl.remove();
      appendMessage(botText, "bot");
    } catch (err) {
      console.error(err);
      loadingEl.remove();
      appendMessage(
        "Ops, tive um problema ao falar com o servidor do CodeImaginBot. Tente novamente em instantes. ⚠️",
        "bot"
      );
    }
  });
});
