import { Github, ArrowUpRight } from 'lucide-react';

export default function PythonCourse() {
  return (
    <section id="python-course" className="py-16 sm:py-24 px-4 sm:px-6 reveal">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 mb-2">Educação</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Featured Course</h2>
        </div>

        <a
          href="https://github.com/henriquesilvadev/curso-python-aprenda-a-programar"
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white/[0.03] border border-white/8 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center shrink-0">
                <Github className="w-5 h-5 text-yellow-400" />
              </div>
              <span className="text-xs font-semibold tracking-widest uppercase text-gray-500">Open Source</span>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-white transition-colors">
            Curso de Python – Aprenda a Programar
          </h3>

          <p className="text-base text-gray-400 leading-relaxed">
            Repositório educacional e colaborativo para guiar você desde os primeiros passos na programação até conceitos intermediários em Python, com foco em boas práticas e resolução de problemas reais.
          </p>
        </a>
      </div>
    </section>
  );
}
