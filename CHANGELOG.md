# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased] - Em Desenvolvimento
- [X] Calculadora de Juros Compostos
- [X] Calculadora de Placa SOlar
- [X] Lista de Compras
- [X] Leitor de QR Code
- [X] Sorteador de Números Personalizado
- [X] Sorteador de Nomes / Equipes (Com Visual de Roleta/Animação)
- [ ] Teste Vocacional Interativo
- [ ] Teste de Personalidade (Estilo MBTI / Big Five)
- [ ] Dashboard de Clima & Previsão do Tempo (Weather App)
- [ ] Gerador de QR Code
- [ ] Editor e Pré-visualizador de Markdown em Tempo Real
- [ ] Compressor e Redimensionador de Imagens no Navegador
- [ ] Gerenciador de Tarefas Kanban (Estilo Trello)
- [ ] Temporizador Pomodoro com Sons Ambiente e Métricas
- [ ] Conversor de Unidades & Moedas com Cotação em Tempo Real
- [ ] Gerador de Paletas de Cores & Extrator de Cores de Imagens
- [ ] Gerador e Testador de Força de Senhas Seguras
- [ ] Leitor de Arquivos CSV / Excel com Geração de Gráficos

## [0.3.0] - 2026-09-04
### Adicionado
- **Sorteador de Números e Nomes:** Funcionalidade para realização de sorteios numéricos e de nomes em grupos/listas de forma aleatória.

## [0.2.0] - 2026-08-06

### Adicionado
- **Lista de Compras Inteligente:** Funcionalidades para adição, exclusão, limpeza geral da lista e marcação de itens comprados/pendentes.
- **Exportação para PDF:** Recurso que converte e baixa a lista de compras formatada em arquivo PDF.
- **Leitor de QR Code:** Funcionalidade de escaneamento e decodificação de códigos QR via câmera do dispositivo.
- **Link para LinkedIn:** Botão de navegação para o perfil do LinkedIn integrado à página "Sobre".

## [0.1.0] - 2026-07-29
### Adicionado
- Página "Sobre Mim" (`/sobre`) com trajetória acadêmica (ADS & MBA em TI), stack técnica e competências profissionais.
- Banner/Card na página Home (`/`) direcionando para a nova página "Sobre Mim".
- Ícones `User` e `ArrowRight` do `lucide-react` para a navegação de perfil.
- Adicionado arquivo de licença `LICENSE` (CC BY-NC 4.0) garantindo a exigência de créditos e proibindo o uso comercial do código.

## [0.0.2] - 2026-07-28
### Adicionado
- Botão de navegação rápida para retornar à página principal na Calculadora de FIIs.
- Rota de integração com a API do Banco Central para captura da Taxa Selic em tempo real.

### Corrigido
- Ajustado estado de carregamento da Selic no recarregamento direto (`F5`).
- Limpeza dos campos de input da calculadora para inicialização zerada.

## [0.0.1] - 2026-07-27
### Alterado
- Refatoração da interface da Calculadora de FIIs com Design System industrial/escuro.
- Adicionada barra de progresso visual para meta de renda passiva.