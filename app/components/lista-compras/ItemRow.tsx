"use client";

import { ItemCompra } from "@/app/types/listaCompras";
import { formatarMoeda } from '../../utils/formatters';
import {Circle, Trash2, CheckCircle} from 'lucide-react';

export interface ItemRowPops {
    item: ItemCompra;
    onToggleComprado: (id: string) => void;
    onRemoverItem: (id: string) => void;
}

export const ItemRow = ({item, onToggleComprado, onRemoverItem}: ItemRowPops) => {
    
    //Calculo do subtotal dos produtos
     const sub = item.quantidade * item.precoEstimado;
    
    return (
        <div className="flex items-center justify-betweenp-4 rounded-xl border         transition-all ${
        item.comprado 
        ? 'bg-slate-900/50 border-slate-800/50 opacity-60' 
        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
        }`}">

            {/* Lado Esquerdo: Checkbox + Nome e Categoria */}
            <div className="flex items-center gap-3">           
                <button
                    type="button"
                    onClick={() => onToggleComprado(item.id)}
                    className="text-emerald-500 hover:scale-110 transition-transform"
                >
                    {item.comprado ? (
                        <CheckCircle className="w-6 h-6 fill-emerald-500/20" />
                        ) : (
                        <Circle className="w-6 h-6 text-slate-500" />
                    )}
                </button>
                    <div>
                        <p className={`font-medium text-white ${item.comprado ? 'line-through text-slate-400' : ''}`}>
                            {item.nome}
                        </p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                            {item.categoria}
                        </span>
                    </div>
            </div>
            
            {/* Lado Direito: Quantidade, Subtotal e Botão de Excluir */}
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-semibold text-white">{formatarMoeda(sub)}</p>
                    <p className="text-xs text-slate-400">
                        {item.quantidade}x {formatarMoeda(item.precoEstimado)}
                    </p>
                </div>

                <button
                type="button"
                onClick={() => onRemoverItem(item.id)}
                className="text-slate-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                title="Remover item"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>

            
    );
};