"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraOff, RefreshCw, ExternalLink, Copy, Check } from "lucide-react";

interface QrScannerProps {
    onScanSuccess?: (resultado: string) => void;
}

export const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess }) => {
    const scannerRef = useRef<Html5Qrcode | null>(null);

    // Estados de controle da interface
    const [escaneando, setEscaneando] = useState(false);
    const [resultado, setResultado] = useState<string | null>(null);
    const [errorCamera, setErrorCamera] = useState<string | null>(null);
    const [copiado, setCopiado] = useState(false);

    // ID único para o container onde o vídeo da câmera será injetado
    const elementId = "reader-qr-code";

    // Função para INICIAR a câmera
    const iniciarScanner = async () => {
        setErrorCamera(null);
        setResultado(null);

        try {
            // Instancia o leitor associado ao elemento da div caso ainda não exista
            if (!scannerRef.current) {
                scannerRef.current = new Html5Qrcode(elementId);
            }

            // Configurações de exibição (resolução da caixa de leitura)
            const config = {
                fps: 10, // Frames por segundo analisados
                qrbox: { width: 250, height: 250 }, // CORRIGIDO: 'height' em vez de 'heigth'
            };

            // Inicia a câmera (environment = câmera traseira no celular)
            await scannerRef.current.start(
                { facingMode: "environment" },
                config,
                (textoLido) => {
                    // CALLBACK DE SUCESSO ao ler o QR Code:
                    setResultado(textoLido);
                    if (onScanSuccess) onScanSuccess(textoLido);
                    pararScanner(); // Paramos o scanner para não ler várias vezes seguidas
                },
                () => {
                    // Callback executado a cada frame sem leitura (ignorado para evitar poluição no console)
                }
            );

            setEscaneando(true);
        } catch (err) {
            console.error("Erro ao acessar a câmera:", err);
            setErrorCamera(
                "Não foi possível acessar a câmera. Verifique se concedeu permissão no seu navegador."
            );
            setEscaneando(false);
        }
    };

    // Função para PARAR a câmera com segurança
    const pararScanner = async () => {
        if (scannerRef.current && scannerRef.current.isScanning) {
            try {
                await scannerRef.current.stop();
                scannerRef.current.clear();
                setEscaneando(false);
            } catch (err) {
                console.error("Erro ao parar a Câmera:", err);
            }
        }
    };

    // Garante a limpeza do recurso de câmera se o componente for desmontado (Clean-up)
    useEffect(() => {
        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, []);

    // Função utilitária para copiar o texto lido para a área de transferência
    const handleCopiar = () => {
        if (resultado) {
            navigator.clipboard.writeText(resultado);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        }
    };

    // Verifica se o resultado obtido é uma URL HTTP/HTTPS válida
    const eURLValida = resultado?.startsWith("http://") || resultado?.startsWith("https://");

    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl max-w-lg mx-auto space-y-6">
            
            {/* Botões de Controle da Câmera */}
            <div className="flex justify-center gap-4">
                {!escaneando ? (
                    <button
                        type="button"
                        onClick={iniciarScanner}
                        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
                    >
                        <Camera className="w-5 h-5" />
                        <span>Ativar Câmera</span>
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={pararScanner}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-medium px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-900/30 active:scale-95"
                    >
                        <CameraOff className="w-5 h-5" />
                        <span>Desativar Câmera</span>
                    </button>
                )}
            </div>

            {/* Mensagem de Erro de Permissão */}
            {errorCamera && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl text-center">
                    {errorCamera}
                </div>
            )}

            {/* Container onde o vídeo da Câmera é injetado */}
            <div className={`relative overflow-hidden rounded-xl border-2 border-slate-800 bg-slate-950 transition-all ${
                escaneando ? "min-h-[300px] border-emerald-500/50" : "h-0 border-none"
            }`}>
                <div id={elementId} className="w-full h-full"></div>
            </div>

            {/* Resultado da Leitura */}
            {resultado && (
                <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl space-y-3">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                        Conteúdo Detectado:
                    </p>

                    <p className="text-sm font-mono text-emerald-400 break-all bg-slate-900 p-3 rounded-lg">
                        {resultado}
                    </p>

                    <div className="flex gap-2 justify-end">
                        <button
                            type="button"
                            onClick={handleCopiar}
                            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg transition-colors"
                        >
                            {copiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiado ? "Copiado!" : "Copiar"}</span>
                        </button>

                        {eURLValida && (
                            <a
                                href={resultado}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg transition-colors"
                            >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Abrir Link</span>
                            </a>
                        )}

                        <button
                            type="button"
                            onClick={iniciarScanner}
                            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-colors"
                            title="Escanear outro código"
                        >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Escanear Outro</span>
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};