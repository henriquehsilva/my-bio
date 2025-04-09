import React, { useState } from 'react';
import { Code2, Briefcase, Users, Brain, ArrowRight, X, MessageCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
}

function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'dora', text: 'Oi! Eu sou a DORA. Me conta um pouco sobre seu projeto!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: 'user', text: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = {
        role: 'system',
        content: `Você é a DORA, uma assistente virtual do site do Henrique. 
        Seja empática, faça perguntas úteis, e ajude a entender o projeto do visitante. 
        Se o visitante mencionar nome, e-mail ou o tipo de projeto, ajude a registrar essas 
        informações com gentileza. Não invente respostas. Seja objetiva, profissional e simpática.`,
      };

      const chatMessages = [
        systemPrompt,
        ...newMessages.map(msg => ({
          role: msg.from === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: chatMessages,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Desculpe, algo deu errado.';
      setMessages([...newMessages, { from: 'dora', text: reply }]);

      const extractPrompt = [
        {
          role: 'system',
          content: `Extraia nome, email e interesse a partir da conversa. Responda APENAS com JSON no formato:
{ "nome": "...", "email": "...", "interesse": "..." }`
        },
        {
          role: 'user',
          content: newMessages.map(m => `${m.from}: ${m.text}`).join('\n')
        }
      ];

      const extractRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: extractPrompt,
          temperature: 0
        })
      });

      const extractData = await extractRes.json();
      const lead = JSON.parse(extractData.choices?.[0]?.message?.content || '{}');

      if (lead?.email) {
        await addDoc(collection(db, 'leads'), {
          capturedAt: new Date(),
          nome: lead.nome,
          email: lead.email,
          interesse: lead.interesse,
          fullChat: newMessages,
        });
      }

    } catch (err) {
      console.error('Erro ao processar conversa:', err);
      setMessages([...newMessages, { from: 'dora', text: 'Ops! Algo deu errado.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-[#23232f] text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-6">
            Transformando ideias em soluções digitais extraordinárias
          </h1>
          <p className="text-xl mb-8 max-w-2xl">
            Desenvolvimento de software com excelência técnica e inovação para impulsionar seu negócio ao próximo nível
          </p>
          <button 
            onClick={() => setChatOpen(true)} 
            className="bg-[#ff1440] hover:bg-[#cc1036] px-6 py-3 rounded-full font-semibold flex items-center gap-2">
            Fale Conosco <ArrowRight size={20} />
          </button>
        </div>
      </header>

      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-[400px] rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/rEuh7Z7QSyU"
              title="Vídeo de Apresentação"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nossos Serviços</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard icon={<Code2 size={32} />} title="Desenvolvimento" description="Soluções personalizadas com as melhores práticas e tecnologias modernas" />
            <ServiceCard icon={<Brain size={32} />} title="Consultoria" description="Orientação estratégica para transformação digital e inovação" />
            <ServiceCard icon={<Users size={32} />} title="Metodologia Ágil" description="Gestão de projetos que enfatiza a flexibilidade, a colaboração e a entrega iterativa e incremental" />
            <ServiceCard icon={<Briefcase size={32} />} title="Soluções Enterprise" description="Arquiteturas robustas para grandes organizações" />
          </div>
        </div>
      </section>

      <footer className="bg-[#23232f] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            
            <div>
              <h2 className="text-2xl font-bold mb-2">HENRIQUE SILVA DEV</h2>
              <p className="text-sm text-gray-400">Transformando ideias em código.</p>
            </div>

            
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <a href="#" className="hover:text-[#ff1440]">Sobre</a>
              <a href="#" className="hover:text-[#ff1440]">Serviços</a>
              <a href="#" className="hover:text-[#ff1440]">Contato</a>
            </div>

          
            <div className="text-sm text-gray-400">
              <p><strong>Endereço:</strong> Rua F, 210 - Anápolis, GO</p>
              <p><strong>Telefone:</strong> (62) 98584-9729</p>
              <p><strong>Email:</strong> contato@henriquesilva.dev</p>
            </div>
          </div>

          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Henrique Silva Dev. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="bg-white text-black w-80 p-4 rounded-2xl shadow-xl relative flex flex-col">
            <button onClick={() => setChatOpen(false)} className="absolute top-2 right-2">
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold mb-2">DORA</h2>
            <div className="flex flex-col gap-2 h-64 overflow-y-auto border rounded p-2 mb-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`text-sm px-2 py-1 rounded ${msg.from === 'dora' ? 'bg-[#f5f5f5] text-black self-start' : 'bg-[#ff1440] text-white self-end'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Digite sua mensagem..."
                className="flex-1 border px-2 py-1 rounded"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} disabled={loading} className="bg-[#727272] text-white px-4 rounded">
                {loading ? '...' : 'Enviar'}
              </button>
            </div>
          </div>
        )}
        {!chatOpen && (
          <button onClick={() => setChatOpen(true)} className="bg-[#ff1440] text-white rounded-full p-4 shadow-lg hover:scale-105 transition">
            <MessageCircle size={28} />
          </button>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-[#ff1440] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function ProjectCard({ image, title, description }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default App;
