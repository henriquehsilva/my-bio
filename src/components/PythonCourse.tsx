import { Github } from 'lucide-react';

export default function PythonCourse() {
    return (
        <section id="python-course" className="py-20 px-6 reveal">
            <div className="max-w-4xl mx-auto">
                <div className="inline-block mb-6">
                    <span className="text-xs font-light tracking-widest uppercase text-gray-400 border border-gray-700 px-4 py-2 rounded-full">
                        Featured Course
                    </span>
                </div>

                <div className="bg-gradient-to-br from-gray-900/50 to-black border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        Curso de Python – Aprenda a Programar
                    </h3>
                    <p className="text-xl font-light leading-relaxed mb-8 text-gray-300">
                        Bem-vindo ao Curso de Python – Aprenda a Programar! Este é um repositório educacional e colaborativo desenhado para guiar você desde os primeiros passos na programação até conceitos intermediários de desenvolvimento em Python, com foco em boas práticas, legibilidade e resolução de problemas reais.
                    </p>

                    <a
                        href="https://github.com/henriquesilvadev/curso-python-aprenda-a-programar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-200 transition-colors"
                    >
                        <Github className="w-5 h-5" />
                        View on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
}
