import { useState, useEffect } from 'react';
import { Check, Code, Palette, Rocket, Mail, Phone, Github, Linkedin, Instagram, Menu, X } from 'lucide-react';
import { db } from './firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const SECTION_IDS = ['sobre', 'como-funciona', 'incluido', 'depoimentos', 'preco', 'contato'] as const;
type SectionId = typeof SECTION_IDS[number];

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

  const whatsappHref = `https://wa.me/5562985849729?text=${encodeURIComponent(
    'Olá! Quero um website profissional em 1 semana (500 €). Podemos conversar?'
  )}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback({ type: null, msg: '' });

    // validação simples
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
        status: 'new',             // para triagem futura
        source: 'landing-pt',      // identifica origem
        createdAt: serverTimestamp()
      });
      setFeedback({ type: 'success', msg: 'Mensagem enviada com sucesso! Em breve entrarei em contacto.' });
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
            Henrique Silva Dev
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
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-30">
          <source src="hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-[#2E038C]/90 via-[#F20587]/80 to-[#F28705]/70"></div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Transforme a sua ideia num website incrível em apenas 7 dias
          </h1>
          <p className="text-xl md:text-3xl text-white/90 mb-8 font-light">
            Design + Domínio + Desenvolvimento colaborativo — tudo por <span className="font-bold text-[#F2B705]">500 €</span>
          </p>
          <button
            onClick={() => scrollToSection('preco')}
            className="bg-[#F20587] hover:bg-[#F28705] text-white px-12 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
          >
            Começar Agora
          </button>
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
              Website em 1 Semana
            </h2>
            <div className="bg-gradient-to-br from-[#F20587]/10 to-[#2E038C]/10 p-8 md:p-12 rounded-3xl">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Este não é apenas mais um serviço de criação de websites. É uma <span className="font-bold text-[#F20587]">colaboração criativa</span> entre você e um desenvolvedor com mais de <span className="font-bold text-[#2E038C]">10 anos de experiência</span> em desenvolvimento web.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                <span className="font-bold text-[#F28705]">Você participa da criação.</span> Eu transformo a sua visão em código. Juntos, criamos algo único e profissional em apenas 7 dias.
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
              <div className="w-16 h-16 bg-[#F2B705] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pagamento Seguro</h3>
              <p className="text-white/90 text-lg">
                Faça o pagamento seguro através do Stripe. Simples, rápido e protegido.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#F28705] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Reunião Inicial</h3>
              <p className="text-white/90 text-lg">
                Receba um e-mail automático para agendar a nossa primeira conversa. Vamos planear tudo juntos.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 bg-[#BF3604] rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Site Online em 7 Dias</h3>
              <p className="text-white/90 text-lg">
                Em apenas uma semana, o seu website estará online com domínio próprio e pronto para conquistar clientes.
              </p>
            </div>
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
                <Palette className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">Design Responsivo e Exclusivo</h3>
                <p className="text-gray-600">Criado especificamente para o seu negócio, funciona perfeitamente em todos os dispositivos.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#2E038C]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#2E038C] rounded-full flex items-center justify-center flex-shrink-0">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">Domínio Gratuito por 1 Ano</h3>
                <p className="text-gray-600">Escolha o nome perfeito para o seu negócio online, sem custos adicionais.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#F28705]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F28705] rounded-full flex items-center justify-center flex-shrink-0">
                <Rocket className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">Otimização para Google (SEO)</h3>
                <p className="text-gray-600">O seu website pronto para ser encontrado pelos seus clientes no Google.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-[#F2B705]/5 to-transparent rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#F2B705] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2E038C] mb-2">Suporte Pós-Lançamento</h3>
                <p className="text-gray-600">Não fica sozinho após o lançamento. Estou aqui para ajudar no que precisar.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" data-animate className={`py-20 bg-gradient-to-br from-[#F2B705]/10 to-[#F28705]/10 transition-all duration-1000 ${isVisible['depoimentos'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E038C] mb-16 text-center">
            O Que Dizem os Meus Clientes
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* ... seus cards ... */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[#F2B705] text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">
                "Incrível como em apenas uma semana tinha o meu website profissional online. O Henrique é atencioso e percebe mesmo o que queremos."
              </p>
              <p className="font-bold text-[#2E038C]">Maria Santos</p>
              <p className="text-sm text-gray-500">Fotógrafa, Lisboa</p>
            </div>

            {/* ... demais cards ... */}
          </div>
        </div>
      </section>

      {/* Preço */}
      <section id="preco" data-animate className={`py-20 bg-gradient-to-br from-[#2E038C] to-[#BF3604] transition-all duration-1000 ${isVisible['preco'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Tudo o Que Precisa Para Começar
            </h2>

            <div className="bg-white/10 backdrop-blur-sm p-12 rounded-3xl mb-8">
              <div className="text-7xl font-bold text-white mb-4">500 €</div>
              <p className="text-2xl text-white/90 mb-8">Pagamento único. Sem taxas escondidas.</p>

              <ul className="text-left text-white text-lg space-y-4 mb-8">
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Design responsivo e exclusivo</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Domínio gratuito por 1 ano</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Otimização para Google (SEO)</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Suporte pós-lançamento</li>
                <li className="flex items-center gap-3"><Check className="text-[#F2B705]" size={24} />Website online em 7 dias</li>
              </ul>

              <a
                href="https://buy.stripe.com/test_6oUcMZ4EOcbH4rs5J88AE00"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#F20587] hover:bg-[#F28705] text-white px-12 py-4 rounded-full text-xl font-bold transition-all transform hover:scale-105 shadow-2xl"
              >
                Pagar com Stripe
              </a>
            </div>

            <p className="text-white/80 text-sm">Pagamento 100% seguro através do Stripe</p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" data-animate className={`py-20 bg-white transition-all duration-1000 ${isVisible['contato'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2E038C] mb-16 text-center">
            Ainda Tem Dúvidas?
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
                  placeholder="O seu nome"
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
                  placeholder="Conte-me sobre o seu projeto..."
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

              {/* WhatsApp atualizado */}
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
              Desenvolvido a 4 mãos — você e Henrique Silva Dev
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
