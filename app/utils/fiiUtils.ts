export interface EntradasFii {
    precoCota: number;  // Ex: 100 (R$)
    rendimentoMensalCota: number; // Ex: 0.80 (R$ por cota)
    rendaMetaMensal: number; // Ex: 1621 (Salário Mínimo)
    investimentoInicial: number; // Ex: 1000 (Opcional)
}

export interface ResultadoFii {
    dividendYieldMensal: number;  // Em % (ex: 0.8%)
    dividendYieldAnual: number;   // Em % (ex: 9.6%)
    cotasNecessarias: number;     // Total de cotas para atingir a meta
    patrimonioNecessario: number; // Total em R$ investido necessário
    rendaAtual: number;           // Renda mensal com o investimento inicial atual
    progressoPercentual: number;  // % de progresso até o Salário Mínimo/Meta
}

export function calcularMetaFii(dados: EntradasFii): ResultadoFii{
    const {precoCota, rendimentoMensalCota, rendaMetaMensal, investimentoInicial = 0} = dados;

    // Trava de segurança para evitar divisão por zero
    if (precoCota <= 0 || rendimentoMensalCota <= 0) {
    return {
            dividendYieldMensal: 0,
            dividendYieldAnual: 0,
            cotasNecessarias: 0,
            patrimonioNecessario: 0,
            rendaAtual: 0,
            progressoPercentual: 0,
        };
    }

    // Dividend Yield Mensal (%) = (Rendimento por Cota / Preço da Cota) * 100
    const dyMensal = (rendimentoMensalCota / precoCota) * 100;
  
    //Dividend Yield Anual Simples (%)
    const dyAnual = dyMensal * 12;

    //Quantidade de Cotas necessárias para atingir a Renda Meta
    const cotasNecessarias = Math.ceil(rendaMetaMensal / rendimentoMensalCota);

    //Patrimônio Total necessário investido
    const patrimonioNecessario = cotasNecessarias * precoCota;

    //Quantas cotas o usuário compra HOJE com o investimento inicial
    const cotasAtuais = Math.floor(investimentoInicial / precoCota);
    const rendaAtual = cotasAtuais * rendimentoMensalCota;

    //Progresso até a Meta (%)
    const progresso = rendaMetaMensal > 0 
        ? Math.min(100, (rendaAtual / rendaMetaMensal) * 100) 
        : 0;

    return {
        dividendYieldMensal: Number(dyMensal.toFixed(2)),
        dividendYieldAnual: Number(dyAnual.toFixed(2)),
        cotasNecessarias,
        patrimonioNecessario,
        rendaAtual: Number(rendaAtual.toFixed(2)),
        progressoPercentual: Number(progresso.toFixed(1)),
    };
}
