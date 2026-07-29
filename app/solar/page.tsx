"use client";

import React, {useState} from "react";
import Link from 'next/link';
import {ArrowLeft, Sun, Info, CheckCircle2} from "lucide-react";
import { calcularSistemaSolar, InputSolar, ResultadoSolar } from '../utils/solarUtils';
import {BuscarIrradiacaoNasa} from '../services/nasaService';

export default function PaginaSolar(){

    // Estado para armazenar os campos do formulário
    const [formData, setFormData] = useState<InputSolar>({
        consumoMensalKwh: 0,
        irradiacaoDiaria: 0,
        potencialPlacaW: 550,
        latitude: 0,
        longitude: 0 
    });

    // Estado para armazenar os resultados do cálculo
    const [resultado, setResultado] = useState<ResultadoSolar | null>(null);

    // Estado para controle do alerta de sucesso
    const [exibirSucesso, setExibirSucesso] = useState(false);

    //Estados para controlar a busca da API da NASA está ativou ou não
    const [carregandoNasa, setCarregandoNasa] = useState(false);

    const handleBuscarNasa = async () => {
        setCarregandoNasa(true);

        //Trava de segurança: Se a latitude ou longitude não foram preenchidas (ficaram em 0)
        if (formData.latitude === 0 || formData.longitude === 0) {
            alert("Por favor, preencha Latitude e Longitude!")
            setCarregandoNasa(false);
            return;
        }

        try {
            // 3. Chama a API da NASA passando as duas coordenadas do formulário
            const irradiacaoEncontrada = await BuscarIrradiacaoNasa(
                formData.latitude,
                formData.longitude
            );
            // 4. Verifica se a API retornou um valor válido
            if (irradiacaoEncontrada !== null) {
                // Atualiza o formData substituindo apenas a irradiacaoDiaria
                setFormData((prev) => ({
                    ...prev,
                    irradiacaoDiaria: irradiacaoEncontrada
                }));

                alert(`Sucesso! Irradiação obtida: ${irradiacaoEncontrada} kWh/m²/dia`);
            } else {
                alert("Erro ao consultar a NASA. Verifique as coordenadas inseridas.");
            }
        } catch (error){
            console.error
            ("Erro na busca:", error);
            alert("Ocorreu um erro ao conectar com o serviço da NASA.");
        } finally {

        // 5. O bloco 'finally' roda SEMPRE no final, dando sucesso ou erro!
        setCarregandoNasa(false);
    }
    };

    // Função disparada ao clicar no botão de calcular
    const handleCalcular = (e: React.SubmitEvent) => {
        e.preventDefault(); // Impede o recarregamento da página 

    // Dispara a lógica de negócio que está no solarUtils.ts
    const res = calcularSistemaSolar(formData);
    setResultado(res);

    // Exibe o alerta de sucesso
    setExibirSucesso(true);
    };

    return (
        // Fundo em Gradiente representando Amanhecer (esquerda), Meio-dia (centro) e Entardece (direita)
        <main className="min-h-screen bg-gradient-to-r from-amber-600 via-sky-500 to-indigo-950 text-white p-4 md:p-8">

            {/* Botão de Voltar para a Landing Page */}
            <div className="max-w-4xl mx-auto mb-6">
                <Link href="/" className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-lg text-sm backdrop-blur-md transition-all">
                    <ArrowLeft className="w-4 h-4" /> Voltar ao Home
                </Link>
            </div>

            <div>

                {/* Cabeçalho */}
                <header className="flex items-center gap-3 mb-8 border-b border-slate-700/50 pb-4">
                    <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                        <Sun className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">
                            Calculadora Solar Fotovoltaica
                        </h1>
                        <p className="text-slate-400 text-sm">
                            Dimensionamento rápido para geração própria de energia
                        </p>
                    </div>
                </header>

                {/* Formulário & Área de Resultados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Coluna 1: Entrada de Dados */}
                    <form onSubmit={handleCalcular} className="space-y-4">
                        {/* Campo 1: Consumo Mensal */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Consumo Médio Mensal (KWh)
                            </label>
                            <input
                                type="number"
                                required
                                min="1"
                                placeholder="Ex: 350"
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                                onChange={(e) => setFormData({...formData, consumoMensalKwh: Number(e.target.value)})}
                            />
                        </div>

                        {/* Campo 2: Irradiação com API da NASA */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Irradiação Diária (KWh/m²)
                            </label>

                            {/* Subseção: Coordenadas Geográficas */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Latitude</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="Ex: -16.08"
                                        value={formData.latitude || ""}
                                        onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500 text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Longitude</label>
                                    <input
                                        type="number"
                                        step="any"
                                        placeholder="Ex: -47.98"
                                        value={formData.longitude || ""}
                                        onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-amber-500 text-white"
                                    />
                                </div>
                            </div>

                            {/* Botão de Chamada da API */}
                            <button 
                                type="button"
                                onClick={handleBuscarNasa}
                                disabled={carregandoNasa}
                                className="w-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {carregandoNasa ? "Buscando dados na NASA..." : "Obter Irradiação Automática(NASA)"}
                            </button>

                            {/* Campo Final da Irradiação (Atualizado pela API ou Manualmente) */}
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">
                                    Valor da Irradiação (kWh/m²/dia)
                                </label>
                                <input 
                                    type="number"
                                    step="0.01"
                                    required
                                    min="0.1"
                                    placeholder="Ex: 5.15"
                                    value={formData.irradiacaoDiaria || ""}
                                    onChange={(e) => setFormData({...formData, irradiacaoDiaria: Number(e.target.value)})}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 font-semibold text-amber-400 focus:outline-none focus:border-amber-500"
                                />
                            </div>

                        </div>

                        {/* Campo 3: Potência da Placa */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Potência da Placa Solar (KWh)
                            </label>
                            <input
                                type="number"
                                required
                                min="100"
                                value={formData.potencialPlacaW}
                                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                                onChange={(e) => setFormData({...formData, potencialPlacaW: Number(e.target.value)})}
                            />
                        </div>

                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg transition-colors mt-4">
                            Calcular Placas Necessárias
                        </button>
                    </form>

                    {/* Coluna 2: Resultados e Alerta */}
                    <div className="flex flex-col justify-between bg-slate-950/50 p-6 rounded-xl border border-slate-800">
                        {resultado ? (
                            <div className="space-y-6">
                                {/* Alerta de Sucesso Solicitado */}
                                {exibirSucesso && (
                                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-lg flex items-center gap-2 text-sm">
                                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                                        <span>
                                            Cálculo Realizado com Sucesso!
                                        </span>
                                    </div>
                                )}
                                <h3 className="text-lg font-semibold border-b border-slate-800 pb-2">Resultado Estimado</h3>
                                <div>
                                    <span className="text-xs text-slate-400 block">
                                        Consumo Médio Diário
                                    </span>
                                    <p className="text-xl font-bold text-slate-200">
                                        {resultado.consumoDiarioKwh} 
                                            <span className="text-sm font-normal">
                                                kWh/dia
                                            </span>
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-slate-400 block">
                                        Potência Recomendada do Sistema
                                    </span>
                                    <p className="text-xl font-bold text-slate-200">
                                        {resultado.potenciaSistemaKw} 
                                            <span className="text-sm font-normal">
                                                kWp
                                            </span>
                                    </p>
                                </div>

                                <div>
                                    <span className="text-xs text-slate-400 block">
                                        Quantidade Ideal de Painéis
                                    </span>
                                    <p className="text-xl font-bold text-slate-200">
                                        {resultado.qtdPlacas} 
                                    </p>
                                    <span className="text-sm font-normal">
                                        Placas de {formData.potencialPlacaW}W
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-12">
                                <Sun className="w-12 h-12 mb-2 opacity-30"/>
                                <p className="text-sm">Preencha os dados ao lado e clique em calcular para visualizar os resultados.</p>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        </main>
    )
}