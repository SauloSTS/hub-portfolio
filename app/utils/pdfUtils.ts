export const exportarParaPDF = async (elementId: string, nomeArquivo: string = 'lista-de-compras.pdf') => {
    //Localiza o elemento no DOM pelo ID
    const elemento = document.getElementById(elementId);

    if (!elemento) {
        console.error("Elemento para PDF não encontrado");
        return;
    }

    //Importa a biblioteca apenas no navegador (Client-side)
    const html2pdf = (await import('html2pdf.js')).default;

    //Configurações do PDF (Margens, Nome, Qualidade de imagem e Formato da página)
    const opcoes = {
        margin: 10, // Margem em milímetros
        filename: nomeArquivo,
        image: {type: 'jpeg', quality:0.98},
        html2canvas: {scale: 2, useCORS: true}, // escala 2 aumenta a nitidez do texto
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
    } as const;

    //Executa a conversão e o download automático
    html2pdf().set(opcoes).from(elemento).save();
};