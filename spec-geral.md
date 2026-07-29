# 🛠️ Especificação Geral: Hub de Soluções & Portfólio Evolutivo

## 1. Visão Geral do Projeto
O **Hub de Soluções** é uma plataforma web modular e escalável desenvolvida para atuar como portfólio técnico interativo. O objetivo principal do projeto é servir como ambiente de auto-desafio contínuo, onde problemas reais do cotidiano e de negócios são transformados em aplicações funcionais, performáticas e com design industrial moderno.

A plataforma centraliza diferentes categorias de software — desde calculadoras financeiras e de eficiência energética até ferramentas de produtividade, testes comportamentais e sistemas de gestão — demonstrando domínio em engenharia de software, consumo de APIs externas e boas práticas de UX/UI.

---

## 2. Objetivos Principais
- **Auto-Desafio & Aprendizado Prático:** Explorar novos padrões de arquitetura, integração de APIs e gerenciamento de estado complexo a cada novo módulo.
- **Vitrine Profissional:** Exibir para recrutadores e clientes a capacidade de resolver problemas reais de ponta a ponta (Full-stack / Front-end).
- **Escalabilidade:** Manter uma estrutura limpa onde novos sistemas possam ser acoplados sem impactar os módulos existentes.

---

## 3. Arquitetura Técnica & Tecnologias

### 3.1 Core da Aplicação
- **Framework Principal:** [Next.js (App Router)](https://nextjs.org/) — Para renderização híbrida (SSR/Client), roteamento moderno e performance otimizada.
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) — Garantia de tipagem estática, segurança de código e autocompletar eficiente.
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) — Design industrial responsivo, utilitário e performático.
- **Componentização:** Radix UI / Shadcn UI — Acessibilidade e componentes desacoplados.
- **Ícones:** [Lucide React](https://lucide.dev/) — Iconografia leve e consistente.

### 3.2 Integrações & APIs Externas
- **API do Banco Central do Brasil (SGS):** Captura da Taxa Selic em tempo real para cálculo de rentabilidade.
- **APIs de Radiação Solar (NASA POWER):** Dados de insolação regional para precisão na calculadora fotovoltaica.

