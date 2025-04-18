import React, { useState } from 'react';
import { Github, Linkedin, Youtube, X, MessageCircle } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

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
        content: `Você é a DORA, uma assistente virtual do site do Henrique. Seja empática, faça perguntas úteis, e ajude a entender o projeto do visitante. Se o visitante mencionar nome, e-mail ou o tipo de projeto, ajude a registrar essas informações com gentileza. Não invente respostas. Seja objetiva, profissional e simpática.`,
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
          content: `Extraia nome, email e interesse a partir da conversa. Responda APENAS com JSON no formato: { "nome": "...", "email": "...", "interesse": "..." }`
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
    <div className="min-h-screen bg-[#0f0f0f] p-6 md:p-12 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Coluna de perfil */}
        <div className="md:col-span-2 space-y-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-purple-600 overflow-hidden">
              <img src="/profile_bio.jpeg" alt="Henrique Silva" className="object-cover w-full h-full" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white">Henrique Silva</h1>
            <p className="text-sm text-gray-400">Developer & Software Architect</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 shadow-lg">
            <p className="text-gray-300 text-justify text-lg leading-relaxed">
              Sou Henrique Silva, <span className="text-purple-400">desenvolvedor focado em design de sistemas e arquitetura de software</span>. Atuo na
              <span className="text-purple-400"> criação de aplicações robustas e evolutivas</span>, com ênfase em práticas <span className="text-purple-400">ágeis, refatoração contínua e valor real para times de desenvolvimento</span>.
              Estudo padrões de <span className="text-purple-400">arquitetura e processos</span> que tornam o desenvolvimento mais eficaz. Meu trabalho se baseia em <span className="text-purple-400">aprender, conectar ideias relevantes e aplicá-las com clareza e propósito</span>.
            </p>
          </div>

          <div className="flex justify-center gap-6">
            {[{ href: 'https://github.com/henriquehsilva', icon: Github }, { href: 'https://linkedin.com/in/henriquesilvadev', icon: Linkedin }, { href: 'https://youtube.com/@henriquesilvadev', icon: Youtube }].map(({ href, icon: Icon }, i) => (
              <a key={i} href={href} target="_blank" className="text-gray-400 hover:text-purple-400 transition">
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Coluna do Livro */}
        <div className="w-full flex flex-col items-center">
          <a
            href="https://elixir.henriquesilva.dev"
            target="_blank"
            className="relative rounded-xl overflow-hidden transition-all duration-300 hover:ring-4 hover:ring-purple-500"
          >
            <img
              src="https://elixir.henriquesilva.dev/grimorio-capa.png"
              alt="Livro A Jornada Elixir"
              className="rounded-xl shadow-lg w-full max-w-xs"
            />
          </a>
          <p className="mt-4 text-sm text-center text-gray-400">
            Conheça o projeto: <span className="text-purple-400 font-medium">“A Jornada Elixir”</span>
          </p>
        </div>
      </div>

      {/* Chat DORA */}
      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen && (
          <div className="bg-white text-black w-80 p-4 rounded-2xl shadow-xl relative flex flex-col">
            <button onClick={() => setChatOpen(false)} className="absolute top-2 right-2">
              <X size={18} />
            </button>
            <h2 className="text-lg font-bold mb-2">DORA</h2>
            <div className="flex flex-col gap-2 h-64 overflow-y-auto border rounded p-2 mb-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`text-sm px-2 py-1 rounded ${msg.from === 'dora' ? 'bg-[#f5f5f5] text-black self-start' : 'bg-[#8B5CF6] text-white self-end'}`}>
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
              <button onClick={handleSend} disabled={loading} className="bg-[#8B5CF6] text-white px-4 rounded">
                {loading ? '...' : 'Enviar'}
              </button>
            </div>
          </div>
        )}
        <button onClick={() => setChatOpen(true)} className="bg-[#8B5CF6] text-white rounded-full p-4 shadow-lg hover:scale-105 transition">
          <MessageCircle size={28} />
        </button>
      </div>
    </div>
  );
}

export default App;
