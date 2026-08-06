"use client";

import Link from "next/link";

export default function SobreMimPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* NAVEGAÇÃO DE VOLTA */}
        <nav>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            ← Voltar para o Hub Home
          </Link>
        </nav>

        {/* CABEÇALHO DE APRESENTAÇÃO */}
        <header className="space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-medium text-amber-400">
            Analista & Desenvolvedor de Software
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Focado em resolver problemas reais com tecnologia e visão estratégica.
          </h1>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-3xl">
            Unindo a base técnica de <strong>Análise e Desenvolvimento de Sistemas (ADS)</strong> com a visão estratégica do meu <strong>MBA em TI</strong>, transformo necessidades operacionais em softwares funcionais, modernos e seguros.
          </p>
        </header>

        {/* SEÇÃO DE PILARES PROFISSIONAIS (3 PALAVRAS-CHAVE) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <span className="text-3xl">🔍</span>
            <h2 className="text-lg font-bold text-white mt-3 mb-1">Curioso</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Movido pelo desejo constante de entender o funcionamento interno das tecnologias e explorar novos frameworks.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <span className="text-3xl">🎯</span>
            <h2 className="text-lg font-bold text-white mt-3 mb-1">Determinado</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diante de bugs desafiadores ou regras complexas, investigo documentações e atuo até encontrar a melhor solução.
            </p>
          </div>

          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <span className="text-3xl">🤝</span>
            <h2 className="text-lg font-bold text-white mt-3 mb-1">Amigável</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Foco em manter uma comunicação clara e empática com usuários, clientes e equipes de desenvolvimento.
            </p>
          </div>
        </section>

        {/* TRAJETÓRIA E MINDSET */}
        <section className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-amber-400 border-b border-slate-800 pb-3">
            📖 Minha Trajetória & Visão
          </h2>
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>
              Minha paixão por tecnologia começou no ensino médio, motivada pela curiosidade de entender como jogos complexos e sistemas de gestão empresarial eram construídos. Meus primeiros passos práticos foram com Visual Basic (VB) e automações em planilhas, onde criei meus primeiros módulos de cadastro e relatórios.
            </p>
            <p>
              Na graduação em <strong>Análise e Desenvolvimento de Sistemas</strong>, entendi que o verdadeiro papel do desenvolvedor não é apenas codificar, mas sim compreender detalhadamente o problema do cliente e desenhar soluções operacionais eficientes.
            </p>
            <p>
              Para elevar essa visão a um nível corporativo, busquei a especialização no <strong>MBA em TI</strong>, aprofundando conhecimentos em frameworks de governança e gestão como <em>ITIL, COBIT e Gestão de Projetos</em>. Essa combinação me permite dialogar com clareza tanto com a área técnica quanto com os stakeholders de negócios.
            </p>
          </div>
        </section>

        {/* TECNOLOGIAS E FERRAMENTAS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-emerald-400 border-b border-slate-800 pb-3">
            🛠️ Stack Técnica & Ferramentas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Front-end & Web</h3>
              <div className="flex flex-wrap gap-2">
                {["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "HTML5 / CSS3"].map((tech) => (
                  <span key={tech} className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Back-end, Banco de Dados & Segurança</h3>
              <div className="flex flex-wrap gap-2">
                {["APIs RESTful", "Supabase (RLS)", "PostgreSQL", "Autenticação OTP", "Segurança com JWT", "Variáveis de Ambiente (.env)"].map((tech) => (
                  <span key={tech} className="bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* REDES E CONTATO */}
        <footer className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Lado Esquerdo: Chamada Unificada */}
          <div className="text-center lg:text-left space-y-1">
            <h3 className="text-xl font-bold text-white">Vamos construir algo juntos?</h3>
            <p className="text-xs text-slate-400 mt-1">
              Acompanhe meus projetos no GitHub ou conecte-se comigo no LinkedIn para trocarmos uma ideia.
            </p>
          </div>

          {/* Lado Direito: Os dois botões lado a lado */}
          <div className="flex items-center gap-4">
            {/* Botão GitHub */}
            <a
              href="https://github.com/SauloSTS"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all text-xs flex items-center gap-2 shadow-lg shadow-amber-500/10 active:scale-95"
            >
              <span>💻</span>
              <span>GitHub</span>
            </a>

            {/* Botão LinkedIn */}
            <a
              href="https://www.linkedin.com/in/saulo-silva-83a5931a3/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all text-xs flex items-center gap-2 shadow-lg shadow-sky-500/10 active:scale-95"
            >
              <span>👔</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </footer>

      </div>
    </div>
  );
}