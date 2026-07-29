"use client";

import {useState, useEffect} from 'react';
import { calcularMetaFii } from '../utils/fiiUtils';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CalculadoraFiiPage() {

    // Estado para guardar a taxa Selic buscada da nossa API
    const [taxaSelic, setTaxaSelic] = useState<number | null>(null);
    const [carregandoSelic, setCarregandoSelic] = useState(true);

    // Estado do formulário de FII
    const [formData, setFormData] = useState({
        precoCota: 0,
        rendimentoMensalCota: 0,
        rendaMetaMensal: 1621, // Valor base do Salário Mínimo
        investimentoInicial: 0,
    });

    // Busca a Selic na rota que criamos na etapa anterior
    useEffect(() => {

        //Variável de controle para evitar vazamento de memória (Memory Leak)
        let isMounted = true;

        async function carregarSelic() {
            try{
                const res = await fetch("/api/selic");

                if (!res.ok) throw new Error("Erro na requisição");

                const data = await res.json();

                //Só atualiza o estado se o componente ainda estiver na tela
                if (isMounted) {
                    setTaxaSelic(data.taxaSelic);
                }

            } catch (error) {
                console.error("Erro ao carregar Selic:", error);
                if (isMounted) {
                    setTaxaSelic(10.5);
                }
            } finally {
                if (isMounted) {
                    setCarregandoSelic(false);
                }
            }
        }
        carregarSelic();
        //Função de Limpeza (Cleanup function)
        return () => {
            isMounted = false;
        };
}, []);
    
    /// Executa os cálculos em tempo real sempre que o formulário muda
  const resultado = calcularMetaFii(formData);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Botão de Voltar para a Landing Page */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link href="/" className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-lg text-sm backdrop-blur-md transition-all">
                    <ArrowLeft className="w-4 h-4" /> Voltar ao Home
                </Link>
            </div>
        
        {/* CABEÇALHO COM TAXA SELIC */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 p-6 rounded-2xl border border-slate-800 backdrop-blur-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              📊 Calculadora de FIIs
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Simule a conquista da sua independência financeira com Fundos Imobiliários.
            </p>
          </div>

          {/* Card Selic do BCB */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 px-4 py-2.5 rounded-xl flex items-center gap-3">
            <span className="text-xl">🏛️</span>
            <div>
              <p className="text-xs text-slate-400 uppercase font-semibold">Taxa Selic (BCB)</p>
              <p className="text-emerald-400 font-bold text-lg">
                {carregandoSelic ? "Carregando..." : `${taxaSelic}% a.a.`}
              </p>
            </div>
          </div>
        </header>

        {/* MEDIDOR DE INDEPENDÊNCIA FINANCEIRA (HERO CARD) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-6 md:p-8 rounded-2xl border border-amber-500/30 shadow-xl shadow-amber-500/5 relative overflow-hidden">
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                🎯 Progresso da Independência
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {resultado.progressoPercentual}% <span className="text-sm font-normal text-slate-400">da Meta Atingida</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Renda Atual Gerada</p>
              <p className="text-xl font-bold text-emerald-400">
                R$ {resultado.rendaAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} /mês
              </p>
            </div>
          </div>

          {/* Barra de Progresso com Brilho Dourado */}
          <div className="w-full h-4 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(245,158,11,0.5)]"
              style={{ width: `${resultado.progressoPercentual}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-400 mt-3">
            <span>R$ 0,00</span>
            <span>Meta: R$ {formData.rendaMetaMensal.toLocaleString("pt-BR")} /mês (Salário Mínimo)</span>
          </div>
        </div>

        {/* GRID: FORMULÁRIO E RESULTADOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PAINEL DE ENTRADAS */}
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-semibold text-amber-400 border-b border-slate-800 pb-2">
              ⚙️ Parâmetros do Fundo
            </h3>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Preço Atual da Cota (R$)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ex: 10.50"
                value={formData.precoCota || ""}
                onChange={(e) => setFormData({ ...formData, precoCota: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Rendimento Mensal por Cota (R$)</label>
              <input
                type="number"
                step="0.01"
                placeholder="Ex: 0.09"
                value={formData.rendimentoMensalCota || ""}
                onChange={(e) => setFormData({ ...formData, rendimentoMensalCota: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Sua Meta de Renda Mensal (R$)</label>
              <input
                type="number"
                value={formData.rendaMetaMensal || ""}
                onChange={(e) => setFormData({ ...formData, rendaMetaMensal: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-amber-400 font-bold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Quanto Você Tem para Investir Hoje (R$)</label>
              <input
                type="number"
                placeholder="Ex: 1000"
                value={formData.investimentoInicial || ""}
                onChange={(e) => setFormData({ ...formData, investimentoInicial: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-emerald-400 font-medium focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* PAINEL DE RESULTADOS E MÉTRICAS */}
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 border-b border-slate-800 pb-2">
                📈 Projeção do Investimento
              </h3>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400">DY Mensal</p>
                  <p className="text-xl font-bold text-emerald-400">{resultado.dividendYieldMensal}%</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <p className="text-xs text-slate-400">DY Anualizado</p>
                  <p className="text-xl font-bold text-emerald-400">{resultado.dividendYieldAnual}%</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-400">Cotas Necessárias</p>
                    <p className="text-lg font-bold text-white">{resultado.cotasNecessarias.toLocaleString("pt-BR")} cotas</p>
                  </div>
                  <span className="text-2xl">🧱</span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-400">Patrimônio Alvo Total</p>
                    <p className="text-lg font-bold text-amber-400">
                      R$ {resultado.patrimonioNecessario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 text-center italic mt-4">
              * Rentabilidade passada não é garantia de retorno futuro.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}