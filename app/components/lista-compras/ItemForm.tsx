"use client";

import React, { useState } from 'react';
import { ItemCompra } from '../../types/listaCompras';
import {PlusCircle} from 'lucide-react';

//Definimos a interface das PROPS que este componente espera receber do pai (page.tsx)
interface ItemFromPops {
    onAdicionarItem: (novoItem: ItemCompra) => void;
}

export const ItemForm: React.FC<ItemFromPops> = ({onAdicionarItem}) => {
    //Estados locais para controlar cada campo do formulário individualmente
    const [nome, setNome] = useState('');
    const [precoEstimado, setPrecoEstimado] = useState<number>(1);
    const [quantidade, setQuantidade] = useState<number>(0);
    const [categoria, setCategoria] = useState<ItemCompra['categoria']>('Mercearia');

    //Função acionada ao submeter o formulário (click no botão ou tecla Enter)
    const handleSubmit = (e: React.SubmitEvent) => {
        //Evita o comportamento padrão do HTML de recarregar a página ao enviar o formulário
        e.preventDefault();

        //Validação básica: não permite adicionar item sem nome
        if (!nome.trim()) return;

        //Constrói o novo objeto do tipo ItemCompra
        const novoItem: ItemCompra = {
            id: crypto.randomUUID(), //Gera um ID único e aleatório no navegador
            nome: nome.trim(),
            quantidade: Number(quantidade),
            precoEstimado: Number(precoEstimado),
            comprado: false,
            categoria,
        };

        //Envia o item para a função que veio da page.tsx
        onAdicionarItem(novoItem);

        //Reseta os campos do formulário para o estado inicial
        setNome('');
        setQuantidade(1);
        setPrecoEstimado(0);
        setCategoria('Mercearia');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 mb-8"
        >
            <h2 className="text-xl font-semibold text-white mb-2">
                Adicionar Novo Item
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Campo: Nome do Produto */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium">
                        Produto
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Leite Integral"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        required
                    />
                </div>

                {/* Campo: Categoria */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium">
                        Categoria
                    </label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value as ItemCompra['categoria'])}
                        className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        required
                    >
                        <option value={"Hortifruti"}>Hortifruti</option>
                        <option value={"Mercearia"}>Mercearia</option>
                        <option value={"Laticínios"}>Laticínios</option>
                        <option value={"Limpeza"}>Limpeza</option>
                        <option value={"Outros"}>Outros</option>
                    </select>
                </div>

                {/* Campo: Quantidade */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium">
                        Quantidade
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                        className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        required
                    />
                </div>

                {/* Campo: Preço Estimado */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400 font-medium">
                        Preço Estimado
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0,00"
                        value={precoEstimado}
                        onChange={(e) => setPrecoEstimado(Number(e.target.value))}
                        className="bg-slate-950 border border-slate-800 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        required
                    />
                </div>

            </div>

            {/* Botão de Submit */}
            <button
                type="submit"
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
            >
                <PlusCircle className="w-5 h-5" />
                <span>Adicionar à Lista</span>

            </button>
        </form>
    );
};

