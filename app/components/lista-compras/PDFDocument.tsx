"use client";

import { formatarMoeda } from '@/app/utils/formatters';
import { ItemCompra } from '../../types/listaCompras';


interface PDFDocumentProps{
    itens: ItemCompra[];
}

export const PDFDocument = ({itens}: PDFDocumentProps) => {
    const ValorTotalGeral = itens.reduce((acumulador, item) => {
        return acumulador + item.quantidade * item.precoEstimado;
    }, 0); // O '0' é o valor inicial do acumulador
  
    const DataAtual = new Date().toLocaleDateString("pt-BR");

    return (
        // ID obrigatório que o pdfUtils.ts procurará no DOM
        <div 
      id="layout-impresso-pdf" 
      style={{ backgroundColor: "#ffffff", color: "#000000", fontFamily: "sans-serif" }}
      className="p-8 max-w-2xl mx-auto"
    >
      <div style={{ borderBottom: "2px solid #e2e8f0" }} className="pb-4 mb-6 flex justify-between items-end">
        <div>
          <h1 style={{ color: "#0f172a" }} className="text-2xl font-bold">🛒 Lista de Compras</h1>
          <p style={{ color: "#64748b" }} className="text-sm">Relatório para Mercado / Impressão</p>
        </div>
        <span style={{ color: "#94a3b8" }} className="text-xs">Data: {DataAtual}</span>
      </div>

      <table className="w-full text-left border-collapse mb-6">
        <thead>
          <tr style={{ borderBottom: "2px solid #cbd5e1", color: "#475569" }} className="text-xs uppercase">
            <th className="py-2">Item</th>
            <th className="py-2">Categoria</th>
            <th className="py-2 text-center">Qtd</th>
            <th className="py-2 text-right">Preço Un.</th>
            <th className="py-2 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {itens.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td className="py-2.5 font-medium" style={{ color: "#0f172a" }}>{item.nome}</td>
              <td className="py-2.5" style={{ color: "#64748b" }}>{item.categoria}</td>
              <td className="py-2.5 text-center" style={{ color: "#0f172a" }}>{item.quantidade}</td>
              <td className="py-2.5 text-right" style={{ color: "#0f172a" }}>{formatarMoeda(item.precoEstimado)}</td>
              <td className="py-2.5 text-right font-semibold" style={{ color: "#0f172a" }}>
                {formatarMoeda(item.quantidade * item.precoEstimado)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ borderTop: "2px solid #0f172a" }} className="pt-4 flex justify-between items-center">
        <span className="text-base font-bold uppercase" style={{ color: "#0f172a" }}>Total Estimado:</span>
        <span className="text-xl font-extrabold" style={{ color: "#047857" }}>
          {formatarMoeda(ValorTotalGeral)}
        </span>
      </div>
    </div>
  );
};