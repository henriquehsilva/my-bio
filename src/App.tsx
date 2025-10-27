import { useState, useEffect } from 'react';
import { Check, Code, Palette, Rocket, Mail, Phone, Github, Linkedin, Instagram, Menu, X, Calendar } from 'lucide-react';
import { db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SECTION_IDS = ['sobre', 'como-funciona', 'incluido', 'depoimentos', 'preco', 'contato'] as const;
type SectionId = typeof SECTION_IDS[number];

// 👉 Ajuste aqui seus links reais:
const CALENDLY_URL = 'https://calendly.com/henriquesilvadev/mentoria-1-1';
const STRIPE_URL   = 'https://buy.stripe.com/6oU6oI5mU1smge1gEW14400'; // substitua pelo checkout de R$50/h

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<Partial<Record<SectionId, boolean>>>({});

  // ---- Formulário contato ----
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; msg: string }>({ type: null, msg: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (el.id) {
              setIsVisible((prev) => ({ ...prev, [el.id as SectionId]: true }));
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // CTA do WhatsApp (atualizado para mentoria)
  const whatsappHref = `https://wa.me/5562985849729?text=${encodeURIComponent(
    'Olá! Quero agendar uma mentoria de programação (R$ 50,00 / 1h). Podemos conversar?'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ type: null, msg: '' });

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback({ type: 'error', msg: 'Preencha nome, e-mail e mensagem.' });
      return;
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        status: 'new',
        source: 'landing-mentoria',
        createdAt: serverTimestamp()
      });
      setFeedback({ type: 'success', msg: 'Mensagem enviada com sucesso! Em breve entro em contato.' });
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', msg: 'Não foi possível enviar. Tente novamente em instantes.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-[#F20587] to-[#2E038C] bg-clip-text text-transparent">
            Henrique Silva Dev — 1:1
          </div>

          <button
            className="md:hidden text-[#2E038C]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none gap-4 p-4 md:p-0`}>
            <button onClick={() => scrollToSection('sobre')} className="text-[#2E038C] hover:text-[#F20587] transition-colors">Sobre</button>
            <button onClick={() => scrollToSection('como-funciona')} className="text-[#2E038C] hover:text-[#F20587] transition-colors">Como Funciona</button>
            <button onClick={() => scrollToSection('preco')} className="text-[#2E038C] hover:text-[#F20587] transition-colors">Preço</button>
            <button onClick={() => scrollToSection('contato')} className="text-[#2E038C] hover:text-[#F20587] transition-colors">Contato</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-80">
          <source src="https://elixir-movies.s3.us-east-2.amazonaws.com/hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-[#2E038C]/90 via-[#F20587]/80 to-[#F28705]/70"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Mentoria de Programação 1:1
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Do zero aos seus primeiros projetos: <span className="font-semibold"><a href="https://exercism.io/" target='_blank'> Exercism</a></span>, <span className="font-semibold">Lógica</span>, <span className="font-semibold">TDD</span> e <span className="font-semibold">IA</span> no seu ritmo.
            <br />
            <span className="font-bold text-[#F2B705]">R$ 50,00 / 1h</span> — grupos sub-representados: <span className="font-bold">-30%</span>.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#2E038C] px-8 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-2xl"
            >
              <Calendar size={20} /> Agendar no Calendly
            </a>
            <a
              href="#preco"
              className="bg-[#F20587] hover:bg-[#F28705] text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-2xl"
            >
              Ver Preço e Pagamento
            </a>
          </div>

          <p className="text-white/80 mt-6 text-sm">
            +5 mentorias no mês ⇒ acesso ao conteúdo pago da minha revista digital: <a className="underline" href="https://henriquesilva.substack.com/" target="_blank" rel="noreferrer">henriquesilva.substack.com</a>
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" data-animate className={`py-20 bg-white transition-all duration-1000 ${isVisible['sobre'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2E038C] mb-8 text-center">
              Trilha Personalizada
            </h2>
            <div className="bg-gradient-to-br from-[#F20587]/10 to-[#2E038C]/10 p-8 md:p-12 rounded-3xl">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Mentoria individual e prática para acelerar sua jornada em programação. Começamos com <span className="font-semibold">lógica</span> e seguimos por <span className="font-semibold">Exercism</span> (exercícios guiados), evoluímos com <span className="font-semibold">TDD</span> e incorporamos <span className="font-semibold">IA</span> para turbinar sua produtividade.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                Você define objetivos, eu desenho a trilha e praticamos juntos em <span className="font-semibold">sessões de 60 minutos</span>. No final, você entrega <span className="font-semibold">projetos reais</span> para o seu portfólio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" data-animate className={`py-20 bg-gradient-to-br from-[#2E038C] to-[#F20587] transition-all duration-1000 ${isVisible['como-funciona'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
            Como Funciona
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <Calendar className="text-[#2E038C]" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">1) Agende</h3>
              <p className="text-white/90 text-lg">
                Escolha um horário no <span className="font-semibold">Calendly</span> para sua mentoria de 1h.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#F2B705] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">2) Pague</h3>
              <p className="text-white/90 text-lg">
                <span className="font-semibold">R$ 50,00 / 1h</span> via <span className="font-semibold">Stripe</span>. Grupos sub-representados possuem <span className="font-semibold">30% de desconto</span>.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#BF3604] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">3) Evolua</h3>
              <p className="text-white/90 text-lg">
                Trilha customizada com <span className="font-semibold">Exercism</span>, <span className="font-semibold">TDD</span>, <span className="font-semibold">IA</span> e <span className="font-semibold">projetos reais</span>. +5 mentorias/mês ⇒ acesso à revista digital paga.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#2E038C] px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-2xl"
            >
              Agendar no Calendly
            </a>
            <a
              href={STRIPE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#F20587] hover:bg-[#F28705] text-white px-10 py-4 rounded-full text-lg font-bold transition-all hover:scale-105 shadow-2xl"
            >
              Pagar 1h no Stripe (R$ 50,00)
            </a>
          </div>
        </div>
      </section>

      {/* Incluído */}
      <section id="incluido" data-animate className={`py-20 bg-white transition-all duration-1000 ${isVisible['incluido'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E038C] mb-16 text-center">
            O Que Está Incluído
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#F20587]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F20587] rounded-full flex items-center justify-center flex-shrink-0">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">Trilha Personalizada</h3>
                <p className="text-gray-600">Plano sob medida alinhado aos seus objetivos (carreira, faculdade, mudança de área).</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#2E038C]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#2E038C] rounded-full flex items-center justify-center flex-shrink-0">
                <Palette className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">Exercism + Lógica</h3>
                <p className="text-gray-600">Exercícios guiados, feedback e evolução da base de raciocínio.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#F28705]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F28705] rounded-full flex items-center justify-center flex-shrink-0">
                <Rocket className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">TDD na Prática</h3>
                <p className="text-gray-600">Comece escrevendo testes e aprenda a evoluir código com segurança.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#F2B705]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F2B705] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">IA no Fluxo de Trabalho</h3>
                <p className="text-gray-600">Aprenda a usar IA para brainstorming, refatoração, testes e documentação.</p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-10">
            Bônus: quem fizer <span className="font-semibold">+5 mentorias no mês</span> ganha acesso ao conteúdo pago da revista digital{' '}
            <a className="underline" href="https://henriquesilva.substack.com/" target="_blank" rel="noreferrer">henriquesilva.substack.com</a>.
          </p>
        </div>
      </section>

      {/* Depoimentos (mantido, pode adaptar depois) */}
      <section
        id="depoimentos"
        data-animate
        className={`py-24 bg-gradient-to-br from-[#F2B705]/10 to-[#F28705]/10 transition-all duration-1000 ${
          isVisible['depoimentos']
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#2E038C] mb-20 text-center">
            O que dizem 
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQHU_uGBR6GkDw/profile-displayphoto-shrink_400_400/B4DZWW9H0cH4Ag-/0/1741994360948?e=1762992000&v=beta&t=1iFO6TMUgbAC4T-RC6GW_RvWHUuSaFN8hGSLyUSju60"
                  alt="Sabrina Otoni"
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-[#F2B705]/30 group-hover:ring-[#F28705]/50 transition-all duration-300"
                />
                <div>
                  <p className="font-bold text-[#2E038C]">Sabrina Otoni</p>
                  <p className="text-sm text-gray-500">
                    Tutora de Inteligência Artificial – FIAP
                  </p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F2B705] text-lg">★</span>
                ))}
              </div>

              <p className="text-gray-700 italic leading-relaxed">
                “O Henrique é um aluno muito <b>engajado</b>, sempre demonstra <b>iniciativa em
                colaborar com os colegas e contribui de forma positiva para o
                aprendizado coletivo</b>. É <b>organizado</b>, <b>curioso</b> e possui um <b>pensamento
                técnico voltado à construção de soluções inteligentes</b>. Sem dúvida,
                tem um excelente potencial para se destacar ao final do curso na
                FIAP.”
              </p>
            </div>

            {/* Outros cards de depoimentos */}
          </div>
        </div>
      </section>

      {/* Preço */}
      <section id="preco" data-animate className={`py-20 bg-gradient-to-br from-[#2E038C] to-[#BF3604] transition-all duration-1000 ${isVisible['preco'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Preço Simples e Transparente
            </h2>

            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl mb-8">
              <div className="text-6xl md:text-7xl font-bold text-white mb-2">R$ 50,00</div>
              <p className="text-white/90 text-xl mb-6">por sessão de 1 hora</p>

              <ul className="text-left text-white text-lg space-y-4 mb-8">
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Trilha personalizada (Exercism, Lógica, TDD, IA)</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Sessões 1:1 com prática guiada</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Projetos reais para portfólio</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Suporte entre sessões</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />+5 mentorias/mês ⇒ acesso à revista paga</li>
              </ul>

              <div className="grid md:grid-cols-2 gap-4">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-[#2E038C] px-8 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-2xl"
                >
                  Agendar no Calendly
                </a>
                <a
                  href={STRIPE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#F20587] hover:bg-[#F28705] text-white px-8 py-4 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-2xl"
                >
                  Pagar 1h no Stripe
                </a>
              </div>
            </div>

            <p className="text-white/90">
              <span className="font-semibold">Grupos sub-representados</span> (mulheres, pessoas negras/indígenas, PCD, LGBTQIA+ e outras minorias na tecnologia) têm <span className="font-semibold">30% de desconto</span>. Informe no agendamento.
            </p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" data-animate className={`py-20 bg-white transition-all duration-1000 ${isVisible['contato'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E038C] mb-16 text-center">
            Fale Comigo
          </h2>

          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-[#2E038C] font-semibold mb-2">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#2E038C]/20 rounded-lg focus:border-[#F20587] focus:outline-none transition-colors"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-[#2E038C] font-semibold mb-2">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#2E038C]/20 rounded-lg focus:border-[#F20587] focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-[#2E038C] font-semibold mb-2">Mensagem</label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#2E038C]/20 rounded-lg focus:border-[#F20587] focus:outline-none transition-colors"
                  placeholder="Conte sua meta (ex.: primeira vaga, projeto pessoal, mudança de área...)"
                  required
                ></textarea>
              </div>

              {feedback.type && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    feedback.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {feedback.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full ${
                  submitting ? 'opacity-70 cursor-not-allowed' : 'bg-[#F20587] hover:bg-[#2E038C]'
                } text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors`}
              >
                {submitting ? 'Enviando...' : 'Enviar Mensagem'}
              </button>
            </form>

            <div className="mt-12 flex flex-col md:flex-row justify-center gap-6 text-center">
              <a href="mailto:contato@henriquesilva.dev" className="flex items-center justify-center gap-2 text-[#2E038C] hover:text-[#F20587] transition-colors">
                <Mail size={20} />
                contato@henriquesilva.dev
              </a>

              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-[#2E038C] hover:text-[#F20587] transition-colors">
                <Phone size={20} />
                WhatsApp: +55 62 98584-9729
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2E038C] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg text-center">
              Desenvolvido por Henrique Silva Dev
            </p>

            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/henriquesilvadev" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2B705] transition-colors"><Linkedin size={24} /></a>
              <a href="https://github.com/henriquehsilva" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2B705] transition-colors"><Github size={24} /></a>
              <a href="https://www.instagram.com/henriquesilvadev/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2B705] transition-colors"><Instagram size={24} /></a>
            </div>

            <p className="text-sm text-white/70">Copyright © 2025. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
