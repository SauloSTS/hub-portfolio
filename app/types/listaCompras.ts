export interface ItemCompra {
    id: string;
    nome: string;
    quantidade: number;
    precoEstimado: number;
    comprado: boolean;
    categoria: 'Hortifruti' | 'Mercearia' | 'Laticínios' | 'Limpeza' | 'Outros';
}