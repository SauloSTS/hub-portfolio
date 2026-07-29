/**
 * Interface que define quais dados o formulário do usuário DEVE enviar.
 */
export interface InputSolar {
    consumoMensalKwh: number;   // Ex: 300 (kWh)
    irradiacaoDiaria: number;   // Ex: 5.2 (kWh/m²)
    potencialPlacaW: number;    // Ex: 550 (Watts)
    latitude: number;  // Ex: -16.08
    longitude: number;  // Ex: -47.98
}

/**
 * Interface que define a estrutura do resultado devolvido pelos cálculos.
 */

export interface ResultadoSolar {
    consumoDiarioKwh: number;
    potenciaSistemaKw: number;
    qtdPlacas: number;
}

/**
 * Função responsável por realizar todos os cálculos solares.
 * 
 * @param dados Objeto contendo consumoMensalKwh, irradiacaoDiaria e potenciaPlacaW.
 * @returns Objeto com a quantidade de placas e capacidades do sistema.
 */
export function calcularSistemaSolar(dados: InputSolar): ResultadoSolar {

    //Calcula o consumo médio diário em kWh
    const consumoDiarioKwh = dados.consumoMensalKwh / 30;

    //Calcula a Potência do Sistema (em kWp) necessária.
  //Nota: Aplicamos a eficiência de 75% (fator 0.75) para compensar
  //perdas térmicas, sujeira nos painéis e eficiência do inversor.
  const potenciaSistemakw = (consumoDiarioKwh / dados.irradiacaoDiaria) * 0.75;

  //Converte a potência do sistema de kW para W (multiplicando por 1000)
  //e divide pela potência individual da placa selecionada.
  //Usamos Math.ceil() para arredondar SEMPRE para cima (ex: 5.2 vira 6 placas).
  const quantidadePlacasBrutas = (potenciaSistemakw * 1000) / dados.potencialPlacaW;
  const qtdPlacas = Math.ceil(quantidadePlacasBrutas);

  // Retorna os dados calculados formatados
  return {
    consumoDiarioKwh: Number(consumoDiarioKwh.toFixed(2)),
    potenciaSistemaKw: Number(potenciaSistemakw.toFixed(2)),
    qtdPlacas: qtdPlacas > 0 ? qtdPlacas : 0,
  };
}