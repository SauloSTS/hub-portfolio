/**
 * Busca a irradiação solar média anual (ALLSKY_SFC_SW_DWN) da NASA POWER API
 * com base nas coordenadas de Latitude e Longitude informadas.
 * 
 * @param lat Latitude da região (ex: -16.08 pra Valparaíso de Goiás)
 * @param lon Longitude da região (ex: -47.98)
 * @returns Promessa com o valor médio de irradiação solar em kWh/m²/dia
 */
export async function BuscarIrradiacaoNasa(lat: number, lon: number): Promise<number | null> {
    try{
        // Montagem da URL da API oficial da NASA POWER (sem necessidade de API Key)
        const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=${lon}&latitude=${lat}&format=JSON`;

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Erro ao consulta serviço da NASA");
        }

        const data = await response.json();

        // O parâmetro ALLSKY_SFC_SW_DWN no nó 'ANN' (Annual) nos dá a média anual
        const irradiacaoMediaAnual = data.properties.parameter.ALLSKY_SFC_SW_DWN.ANN;
        return Number(irradiacaoMediaAnual.toFixed(2));
    } catch (error) {
        console.error("Falha ao obter dados solares da NASA:", error);
    return null; // Retorna nulo se der erro para podermos tratar na interface
    }
}