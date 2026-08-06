"use client";

import { useState, useEffect } from 'react';
import { ItemCompra } from '../types/listaCompras';
import { exportarParaPDF } from '../utils/pdfUtils';
import { formatarMoeda } from '../utils/formatters';
import { ItemForm } from '../components/lista-compras/ItemForm';
import { ItemRow } from '../components/lista-compras/ItemRow';
import { PDFDocument } from '../components/lista-compras/PDFDocument';
import {Download, ShoppingBag, Trash2, ArrowLeft} from 'lucide-react';
import Link from 'next/link';


export default function ListaComprasPage(){

    //Estado da Lista de Compras
    const[item, setItem] = useState<ItemCompra[]>([]);

    //Estado para garantir que o código só acesse o localStorage no navegador (Client-side)
    const [montado, setMontado] = useState(false);

    //Carregar itens do LocalStorage ao abrir a tela (Efeito de montagem)
    useEffect (() => {
        setMontado(true);
        const dadosSalvos = localStorage.getItem('@portfolio:lista-compras');
        if (dadosSalvos) {
            try {
            setItem(JSON.parse(dadosSalvos));
        } catch (error) {
            console.error("Error ao carregar dados do LocalStorage:", error);
        }
        }
    }, []);

    //Salvar no LocalStorage sempre que a lista for alterada
    useEffect(() => {
        if (montado){
            localStorage.setItem('@portifolio:lista-compras', JSON.stringify(item));
        }
    }, [item, montado]);

    //Funções de manipulação (Adicionar, Alternar Comprado, Remover)
    const handleAdicionarItem = (novoItem: ItemCompra) => {
        setItem((prev) => [...prev, novoItem]);
    };

    const handleToggleComprado = (id: string) => {
        setItem((prev) => prev.map((item) => item.id === id ? {...item, comprado : !item.comprado}: item)
        );
    };

    const handleRemoverItem = (id: string) => {
        setItem((prev) => prev.filter((item) => item.id !== id)
        );
    };

    const handleLimpaLista = () => {
        if (confirm("Tem certeza que deseja apagar toda a lista de compras?")) {
            setItem([]);
        }
    };

    const handleGerarPDF = () => {
        if (item.length === 0){
            alert("Adicione pelo menos um item à lista para poder baixar em PDF.");
            return;
        }
        exportarParaPDF("layout-impresso-pdf", `lista-de-compras-${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    // Cálculo do Total Geral para a tela principal
    const valorTotalGeral = item.reduce(
        (acc, item) => acc + item.quantidade * item.precoEstimado, 0
    );

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center">
                    
                </div>

                {/* Cabeçalho da Página */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                    {/* Botão de Voltar para a Landing Page */}
            <       div className="max-w-4xl mx-auto mb-6">
                        <Link href="/" className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-lg text-sm backdrop-blur-md transition-all">
                            <ArrowLeft className="w-4 h-4" /> Voltar ao Home
                        </Link>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold flex item-center gap-3 text-white">
                            <ShoppingBag className="w-8 h-8 esmerald-500"/>
                            🛒 Lista de Compras Inteligente
                        </h1>
                        <p className="text-slate-400 text-sm mt-1">
                            Gerencie seus itens, calcule gastos e exporte um relatório em PDF.
                        </p>
                    </div>
                    

                    {/* Botões Global*/}

                    <div className="flex items-center gap-3">
                        {item.length > 0 &&(
                            <button
                                onClick={handleLimpaLista}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-800 hover:border-red-500/50 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors text-sm">
                                <Trash2 className="w-4 h-4"/>
                                Limpa
                            </button>
                        )}
                        <button
                            onClick={handleGerarPDF}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/30 text-sm active:scale-95">
                            <Download className="w-4 h-4"/>
                            📄 Baixar em PDF
                        </button>
                    </div>
                </header>

                {/* Formulário de Adição */}
                <ItemForm onAdicionarItem={handleAdicionarItem} />

                {/* Lista de Itens Interativa */}
                <section className="space-y-4">
                    <div className="flex justify-between item-center px-1">
                        <h2 className="text-lg font-semibold text-white">
                            Itens na Lista ({item.length})
                        </h2>
                        <span className="text-sm font-medium text-esmerald-400">
                            Total estimado: {formatarMoeda(valorTotalGeral)}
                        </span>
                    </div>

                    {item.length === 0 ? (
                        <div className="text-center py-12 bg-slate-900/50 border border-dashed border-slate-800 rounded-2xl">
                            <p className="text-slate-500">Sua lista está vazia.</p>
                            <p className="text-xs text-slate-600 mt-1">
                                Adicione produtos acima para começar!
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {item.map((i) => (
                                <ItemRow
                                    key={i.id}
                                    item={i}
                                    onToggleComprado={handleToggleComprado}
                                    onRemoverItem={handleRemoverItem}
                                />
                            ))}
                        </div>
                    )}
                </section>
            
            {/* ÁREA INVISÍVEL OU FORMATADA EXCLUSIVAMENTE PARA O PDF */}
            <div className="hidden"> {/* Pode ser renderizado ou mantido estilizado */}
                <PDFDocument itens={item} />
            </div>

            </div>
            
        </main>
    );
}