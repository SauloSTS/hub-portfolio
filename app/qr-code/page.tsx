"use client";

import Link from "next/link";
import { QrScanner } from '../components/qr-code/QrScanner';
import { ArrowLeft, QrCode } from 'lucide-react';

export default function QrCodePage(){
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                
                {/* Botão de Voltar para a Landing Page */}
                <div className="max-w-4xl mx-auto mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 bg-black/20 hover:bg-black/40 px-4 py-2 rounded-lg text-sm backdrop-blur-md transition-all">
                        <ArrowLeft className="w-4 h-4" /> Voltar ao Home
                    </Link>
                </div>

            </div>

            {/* Cabeçalho */}
            <header className="border-b border-slate-800 pb-6 text-center md:text-left">
                <h1 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-3 text-white">
                    <QrCode className="w-8 h-8 text-esmerald-500"/>
                    Leitor de QR Code
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    Utilize a câmera do seu dispositivo para ler e decodificar códigos QR em tempo real.
                </p>
            </header>

            {/* Componente do Scanner */}
            <QrScanner />

        </main>
    )
}
