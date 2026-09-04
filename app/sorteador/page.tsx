"use client";

import React, { useState } from "react";
import { sorteadorNomes, sorteadorNumeros } from '../utils/sorteador-utils';
import { ArrowLeft, Dices } from "lucide-react";
import Link from 'next/link';

export default function SorteadorPage(){

    // Estados de Controle da Interface
    const [estaSorteando, setEstaSorteando] = useState<boolean>(false);
    const [numeroExibido, setNumeroExibido] = useState<number | null>(null);
    const [erro, setErro] = useState<string | null>(null);

    // Estados para o formulário de Números
    const [min, setMin] = useState<number>(1);
    const [max, setMax] = useState<number>(100);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [permitirRepeticao, setPermitirRepeticao] = useState<boolean>(false);

    // Estados para o formulário de Números
    const [nome, setNome] = useState<string>("");
    const [quantidadeGrupos, setQuantidadeGrupos] = useState<number>(1);

    // Estado para guardar os resultados do sorteio final
    const [resultadosNumeros, setResultadosNumeros] = useState<number[]>([]);
    const [resultadosNomes, setResultadosNomes] = useState<string[][]>([]);

    // Função que executa a animação e depois revela o resultado real
    const executarSorteioAnimacao = (resultadoFinal: number) => {
        setEstaSorteando(true);
        setErro(null);

        // ria um intervalo que troca o valor rapidamente na tela (efeito roleta)
        const timeIntervalo = window.setInterval(() => {
            const valorTemporario = Math.floor(Math.random() * 100); // valor aleatório só pra efeito visual
            setNumeroExibido(valorTemporario);
        }, 80); // muda a cada 80ms

        // ria um timeout para parar o intervalo após 2.5 segundos
        window.setTimeout(() => {
            clearInterval(timeIntervalo); //Para a animação
            setNumeroExibido(resultadoFinal); //Define o resultado verdadeiro
            setEstaSorteando(false); //Libera o botão
        }, 2500);
    };

    const handleSortearNumeros = (e: React.SubmitEvent) => {
        e.preventDefault();

        try{
            setErro(null);

            //Chamar a função utilitária com os dados do estado
            const resultado = sorteadorNumeros({
                min,
                max,
                quantidade,
                permitirRepeticao
            });

            //Disparar a animação e salvar o resultado real
            // Se for apenas 1 número, fazemos a animação no card principal
            // Se forem vários, salvamos no estado final
            setResultadosNumeros(resultado);
            executarSorteioAnimacao(resultado[0]);

        } catch (err: any){
            setErro(err.message || "Erro ao realizar o sorteio.");
        }
    };

    const handleSortearNomes = (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
        setErro(null);

        const listaDeNome = nome
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== "");

        if (listaDeNome.length === 0) {
            setErro("Informe ao menos um nome para realizar o sorteio.");
            return;
        }

        const resultado = sorteadorNomes({
            nomes: listaDeNome,
            quantidadeGrupos,
        });

        setResultadosNomes(resultado);
        setEstaSorteando(true);

        // Animação simples para liberar o resultado
        window.setTimeout(() => {
            setEstaSorteando(false);
        }, 1000);

    } catch (err: any) {
        setErro(err.message || "Erro ao realizar o sorteio de nomes.");
    }
};

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Cabeçalho da Página */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    {/* Botão de Voltar para a Landing Page */}
                    <div className="max-w-4xl mx-auto mb-6">
                        <Link href="/" className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-lg text-sm backdrop-blur-md transition-all">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Home
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold flex item-center gap-3 text-white">
                            <Dices className="w-8 h-8 stone-500"/>
                            Sorteador de Números e Nomes
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Realize Sorteios de números ou nomes
                        </p>
                    </div>
                </header>

                {/*Formulario para o sorteio de números*/}
                <form onSubmit={handleSortearNumeros} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-6">
                    {/* Mensagem de Erro (caso exista) */}
                    {erro && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {erro}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Input Mínimo */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                Valor Mínimo
                            </label>
                            <input
                                type="number"
                                value={min}
                                onChange={(e) => setMin(Number(e.target.value))}
                                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-stone-500"
                            >
                            </input>
                        </div>
                        {/* Input Máximo */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                Valor Máximo
                            </label>
                            <input
                                type="number"
                                value={max}
                                onChange={(e) => setMax(Number(e.target.value))}
                                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-stone-500"
                            >
                            </input>
                        </div>
                        {/* Input Quantidade */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                Quantidade
                            </label>
                            <input
                                type="number"
                                value={quantidade}
                                onChange={(e) => setQuantidade(Number(e.target.value))}
                                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-stone-500"
                            />
                        </div>
                    </div>

                    {/* Checkbox Permitir Repetição */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="repeticao"
                            checked={permitirRepeticao}
                            onChange={(e) => setPermitirRepeticao(e.target.checked)}
                            className="w-4 h-4 accent-Stone-500 rounded cursor-pointer"
                        />
                        <label htmlFor="repeticao" className="text-sm text-slate-300 cursor-pointer">
                            Permitir números repetidos
                        </label>
                    </div>

                    {/* Botão de Disparo */}
                    <button
                        type="submit"
                        disabled={estaSorteando}
                        className="w-full bg-stone-600 hover:bg-stone-500 disabled:bg-Stone-900/50 text-white font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                    >
                        {estaSorteando ? "Sorteando..." : "Sortear Número(s)"}
                    </button>
                </form>

                {/* Area de Display do Sorteio */}
                <div className="flex flex-col items-center justify-center p-8 bg-slate-900/30 border border-slate-800 rounded-2xl min-h-[200px]">
                    {numeroExibido !== null ? (
                    <div className="text-center">
                    <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
                        {estaSorteando ? "Sorteando..." : "Resultado Final"}
                    </span>
                    <div className="text-6xl font-extrabold text-white mt-2 animate-pulse">
                        {numeroExibido}
                    </div>
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm">Configure os campos e clique em sortear.</p>
                )}

                {/* Se houver múltiplos resultados e o sorteio acabou */}
                {!estaSorteando && resultadosNumeros.length > 1 && (
                    <div className="mt-6 w-full">
                        <h3 className="text-sm font-semibold text-slate-400 mb-3 text-center">Todos os números sorteados:</h3>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {resultadosNumeros.map((num, idx) => (
                                <span key={idx} className="bg-stone-500/20 text-purple-300 border border-stone-500/30 px-3 py-1 rounded-lg text-sm font-bold">
                                    {num}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

                {/*Formulario para o sorteio de nomes*/}
                <form onSubmit={handleSortearNomes} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl space-y-6">
                    {/* Mensagem de Erro (caso exista) */}
                    {erro && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                            {erro}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Input Nomes */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                Nomes
                            </label>
                            <input
                                type="text"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite os nomes separados por vírgula..."
                                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-stone-500"
                            >
                            </input>
                        </div>
                        {/* Input Quantidade de Grupo(s) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-slate-300">
                                Quantidade de Grupo(s)
                            </label>
                            <input
                                type="number"
                                value={quantidadeGrupos}
                                onChange={(e) => setQuantidadeGrupos(Number(e.target.value))}
                                className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:outline-none focus:border-stone-500"
                            />
                        </div>
                    </div>

                    {/* Botão de Disparo */}
                    <button
                        type="submit"
                        disabled={estaSorteando}
                        className="w-full bg-stone-600 hover:bg-stone-500 disabled:bg-stone-900/50 text-white font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                    >
                        {estaSorteando ? "Sorteando..." : "Sortear Nome(s)"}
                    </button>
                </form>

                {/* Area de Display do Sorteio Nomes */}
                <div className="flex flex-col items-center justify-center p-8 bg-slate-900/30 border border-slate-800 rounded-2xl min-h-[200px]">
                    {resultadosNomes.length > 0 ? (
                        <div className="w-full text-center">
                            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold mb-4 block">
                                {estaSorteando ? "Sorteando..." : "Resultado do Sorteio"}
                            </span>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {resultadosNomes.map((grupo, gIdx) => (
                                    <div key={gIdx} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl text-left">
                                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                                            Grupo {gIdx + 1}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {grupo.map((pessoa, pIdx) => (
                                                <span key={pIdx} className="bg-stone-500/20 text-stone-200 border border-stone-500/30 px-3 py-1 rounded-lg text-sm font-semibold">
                                                    {pessoa}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-slate-500 text-sm">Insira os nomes e clique em sortear.</p>
                    )}
                </div>
            </div>
        </main>
    );

}