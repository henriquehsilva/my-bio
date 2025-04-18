import React, { useState } from 'react';
import { Github, Linkedin, Youtube, Bot, Code, Brain, ExternalLink, X, MessageCircle } from 'lucide-react';
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
      // 1. Envia para OpenAI para resposta
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

      // 2. Extração de dados do lead com IA
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
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Avatar Section */}
        <div className="relative mx-auto w-40 h-40">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] rounded-full animate-pulse opacity-20"></div>
          <div className="relative w-40 h-40 bg-[#2a2a2a] rounded-full border-2 border-[#8B5CF6]/20 flex items-center justify-center overflow-hidden">
            <img src='/me.png' alt="Henrique Silva" />
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-4 border-2 border-[#8B5CF6]/20 rounded-lg p-6 bg-[#2a2a2a] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9]">
            Henrique Silva Developer
          </h1>
          <p className="text-gray-300 text-justify leading-relaxed max-w-lg mx-auto">
            Sou Henrique Silva, <span className="text-[#8B5CF6]">desenvolvedor focado em design de sistemas e arquitetura de software</span>.
            Atuo na <span className="text-[#8B5CF6]">criação de aplicações robustas e evolutivas</span>, com ênfase em práticas <span className="text-[#8B5CF6]">ágeis, refatoração contínua e valor real para times de desenvolvimento</span>.
            Estudo padrões de <span className="text-[#8B5CF6]">arquitetura e processos</span> que tornam o desenvolvimento mais eficaz. 
            Meu trabalho se baseia em <span className="text-[#8B5CF6]">aprender, conectar ideias relevantes e aplicá-las com clareza e propósito</span>.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6">
          {[
            { Icon: Github, href: "https://github.com/henriquehsilva" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/henriquesilvadev/" },
            { Icon: Youtube, href: "https://www.youtube.com/@henriquesilvadev" }
          ].map(({ Icon, href }, index) => (
            <a
              key={index}
              href={href}
              className="transform transition-all duration-300 hover:scale-110"
            >
              <Icon 
                className="w-8 h-8 text-gray-400 hover:text-[#8B5CF6]"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </div>
        <div className="z-50">
        {/* Action Button */}
        <a href='https://elixir.henriquesilva.dev' className="px-28 py-4 bg-[#8B5CF6] text-white rounded-lg font-medium 
          transform transition-all duration-300 hover:scale-105 hover:bg-[#6D28D9]
          shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]" target='_blank'>
          <ExternalLink className="inline mr-1" size={14} />
          A Jornada Elixir
        </a>
        </div>
      </div>

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