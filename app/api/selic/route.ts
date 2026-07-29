import {NextResponse} from 'next/server';

export async function GET(){
    try{
        //Chamada para a API pública do Banco Central (Série 432 = Selic Meta % a.a.)
        const response = await fetch(
            'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json', {
                //Revalida os dados a cada 24 horas (86400 segundos) para não sobrecarregar a API
                next: { revalidate: 86400 }
            }
        );

        if (!response.ok) {
            throw new Error('Falha ao obter os dados do Banco Central');
        }

        const data = await response.json();

        //Extrai o valor da última reunião do COPOM
        const valorSelicString = data[0]?.valor;
        const taxaSelic = parseFloat(valorSelicString);

        //Retorna a taxa formatada como JSON
        return NextResponse.json({
            taxaSelic,
            dataAtualizacao: data[0]?.data
        });
    } catch (error) {
        console.error('Erro na rota da Selic:', error);

        // Caso a API do BC esteja fora do ar, podemos retornar um valor padrão de fallback
        return NextResponse.json(
            { taxaSelic: 10.5, erro: 'Usando taxa Selic de fallback' },
            { status: 200 }
        );
    }
}