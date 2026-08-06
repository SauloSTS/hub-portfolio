/**
 * Converte um número decimal para o formato de moeda brasileiro (BRL).
 * Exemplo: 15.5 -> "R$ 15,50"
 */
export const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(valor);
};