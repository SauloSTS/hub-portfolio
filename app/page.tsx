import Link from 'next/link';
import {Sun, TrendingUp, User, ArrowRight, ShoppingCart, QrCode, Dices} from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgb(120,119,198,0.3),rgb(255,255,255,0))] text-white flex flex-col items-center justify-center p-6">

      {/* Cabeçalho */}
      <header className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Ferramentas de Decisão Inteligente
        </h1>
        <p className="text-slate-400 text-lg">
          Calcule a eficiência da sua energia solar, simule sua independência financeira com Fundos Imobiliários ou gerencie suas compras.
        </p>
      </header>

      {/* Grid com os Cards de Calculadoras */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">

        {/* Card 1: Calculadora Solar */}
        <Link href="/solar" className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-amber-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-amber-500/10">
          <div className="flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Sun className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-semibold group-hover:text-amber-400 transition-colors">
              Calculadora Solar
            </h2>
            <p className="text-slate-400 text-sm">
              Dimensione a quantidade de painéis fotovoltaicos ideais com base no seu consumo e na irradiação solar da sua região.
            </p>
          </div>
        </Link>

        {/* Card 2: Calculadora de FIIs */}
        <Link href="/fiis" className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-500/10">
          <div className="flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-semibold group-hover:text-emerald-400 transition-colors">
              Simulador de FIIs
            </h2>
            <p className="text-slate-400 text-sm">
              Descubra quantas cotas precisa para alcançar a renda de um salário mínimo e compare o rendimento com a Poupança.
            </p>
          </div>
        </Link>

        {/* Card 3: Lista de Compras */}
        <Link href="/lista-compras" className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-cyan-500/10">
          <div className="flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
              <ShoppingCart className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-semibold group-hover:text-cyan-400 transition-colors">
              Lista de Compra
            </h2>
            <p className="text-slate-400 text-sm">
              Organize suas compras de forma prática. Adicione, gerencie itens e exporte sua lista formatada em PDF para o mercado.
            </p>
          </div>
        </Link>

        {/* Card 4: Leitor de Qr Code */}
        <Link href="/qr-code" className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-purple-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-purple-500/10">
          <div className="flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 transition-transform">
              <QrCode className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-semibold group-hover:text-purple-400 transition-colors">
              Leitor de QR Code
            </h2>
            <p className="text-slate-400 text-sm">
              Escaneie códigos QR em tempo real pela câmera do seu dispositivo e acesse links e textos com praticidade.
            </p>
          </div>
        </Link>

        {/* Card 5: Sorteador de Números e Nomes */}
        <Link href="/sorteador" className="group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-stone-500/50 hover:bg-slate-900 hover:shadow-2xl hover:shadow-stone-500/10">
          <div className="flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-stone-500/10 text-stone-400 group-hover:scale-110 transition-transform">
              <Dices className="w-8 h-8"/>
            </div>
            <h2 className="text-2xl font-semibold group-hover:text-stone-400 transition-colors">
              Sorteador de Números e Nomes
            </h2>
            <p className="text-slate-400 text-sm">
              Realize sorteios de números e nomes de forma rápida e configurável.
            </p>
          </div>
        </Link>

      </div>

      {/* Banner / Card da Página Sobre Mim */}
      <section className="max-w-4xl w-full">
        <Link 
          href="/sobre" 
          className="group relative flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-8 transition-all hover:border-blue-500/50 hover:bg-slate-900/80 hover:shadow-2xl hover:shadow-blue-500/10"
        >
          <div className="flex items-center gap-5">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform shrink-0">
              <User className="w-8 h-8"/>
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                Conheça o Desenvolvedor
              </h2>
              <p className="text-slate-400 text-sm">
                Acesse meu perfil profissional, trajetória acadêmica em ADS & MBA em TI, e visão de resolução de desafios.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform self-end md:self-center shrink-0">
            <span>Ver perfil completo</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </section>

    </main>
  );
}