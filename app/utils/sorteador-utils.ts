import { dadosSorteadorNome, dadosSorteadorNumeros } from "../types/sorteador";

export function sorteadorNumeros(dados: dadosSorteadorNumeros): number[] {
    const {min, max, quantidade, permitirRepeticao} = dados;

    if (min >= max) {
        throw new Error("O valor mínimo deve ser menor que o máximo.");
    }

    const totalDisponivel = max - min + 1;
    if (!permitirRepeticao && quantidade > totalDisponivel){
        throw new Error("A quantidade de números solicitada é maior que o intervalo disponível.");
    }

    const resultado: number[] = []

    if (permitirRepeticao) {
        for (let i = 0; i < quantidade; i++) {
            const num = Math.floor(Math.random() * totalDisponivel) + min;
            resultado.push(num);
        }
    } else {
        const pool = Array.from({length: totalDisponivel}, (_, i) => min + i);

        for (let i = pool.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }

        return pool.slice(0, quantidade);
    }

    return resultado;
}

export function sorteadorNomes(dados: dadosSorteadorNome): string[][] {
    const {nomes, quantidadeGrupos} = dados;

    if (quantidadeGrupos <= 0){
        throw new Error("A quantidade de grupos deve ser maior que zero.");
    }

    //Cria cópia e embaralha os nomes (Fisher-Yates)
    const nomesEmbaralhados = [...nomes];
    for (let i = nomesEmbaralhados.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [nomesEmbaralhados[i], nomesEmbaralhados[j]] = [nomesEmbaralhados[j], nomesEmbaralhados[i]];
    }

    //Inicializa o array de grupos
    const grupos: string[][] = Array.from({ length: quantidadeGrupos }, () => []);

    //Distribui cada nome ciclicamente entre os grupos
    nomesEmbaralhados.forEach((nomes, i) => {
        grupos[i % quantidadeGrupos] .push(nomes);
    });

    return grupos;    
        
}


