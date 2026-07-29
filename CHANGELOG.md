# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado no [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/).

## [Unreleased] - Em Desenvolvimento
- [X] Calculadora de Juros Compostos
- [X] Suporte a temas escuro/claro

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