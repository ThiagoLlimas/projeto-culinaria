# 🍽️ Cumaru — Alta Gastronomia Brasileira (Premium Landing Page)

> Uma SPA (Single Page Application) conceitual desenvolvida para um restaurante de alta gastronomia focado em pratos e elementos da cultura brasileira. O projeto foi estruturado utilizando tecnologias nativas (Vanilla Stacks) de alta performance, unindo uma identidade visual sofisticada a regras de negócio funcionais de conversão.

---

## 🚀 Demonstração Visual

<img width="3824" height="1992" alt="Captura de tela 2026-06-08 180726" src="https://github.com/user-attachments/assets/d02889cc-436a-4a04-8c6c-08e2a14a14c8" />


---

## 🎨 Identidade Visual e Conceito Orgânico

O design foi projetado para transmitir a sensação de sofisticação com forte apelo às raízes brasileiras:
*   **Paleta de Cores Estratégica:** Fusão do **Verde Floresta** (remetendo à natureza, mata e raízes profundas) com o **Dourado** (sofisticação e alto padrão) e detalhes em **Vermelho** (energia, brasa e estimulação do apetite).
*   **Interface Imersiva:** Fotografia gastronômica em formato de colunas dinâmicas que valorizam a estética dos pratos logo no primeiro impacto visual.

---

## 🛠️ Diferenciais Técnicos (O Poder do Vanilla JS)

Desenvolver uma aplicação rica em interações sem o uso de frameworks modernos exige um entendimento sólido de Engenharia Web. Os principais destaques técnicos deste projeto são:

*   **Carrossel Assíncrono com Temporizador JS:** A seção principal conta com um menu/carrossel inteligente que altera o conteúdo textual e substitui as 4 imagens simultaneamente. Foi implementado um motor de temporização nativo em JavaScript que rotaciona o catálogo automaticamente a cada **5 segundos**, injetando dinamismo fluido na experiência de navegação.
*   **Arquitetura Multi-abas Modular:** Gerenciamento de exibição fluido dividindo a experiência do restaurante em **7 seções estruturadas**: *Início, Cardápio, Nossa Raiz, Carnes na Brasa, Petiscos Gourmet, Drinks e Reservas*.
*   **Pipeline de Reservas (Web3Forms API):** O formulário de reserva de mesas foi codificado de forma nativa e acoplado à API do **Web3Forms**. Quando o usuário realiza um agendamento válido, os dados são processados e disparados em tempo real diretamente para o Gmail do administrador.
*   **Rastreamento Direto com GA4:** Injeção limpa do script nativo do **Google Analytics 4** diretamente na aplicação, permitindo monitorar cliques em "Reservar Mesa" e o comportamento do usuário ao longo das seções.
*   **Conformidade Legal (LGPD):** Banner nativo e funcional de consentimento de cookies integrado à interface para garantir a privacidade dos dados antes da ativação dos scripts de monitoramento.

---

## 📂 Visão Geral da Interface Dinâmica

Ao interagir com o carrossel ou aceitar as diretrizes de privacidade, a interface responde instantaneamente:

<img width="3814" height="1986" alt="Captura de tela 2026-06-08 180737" src="https://github.com/user-attachments/assets/35323f67-f81d-470b-b591-b73af9c9d2d6" />


---

## 💻 Stack Tecnológica

| Tecnologia / Ferramenta | Aplicação no Projeto |
| :--- | :--- |
| **HTML5 Nativo** | Estruturação semântica rigorosa para máxima acessibilidade e indexação SEO. |
| **CSS3 Avançado** | Estilização moderna, efeitos de transição fluidos e total responsividade (Mobile-First). |
| **Vanilla JavaScript** | Inteligência da aplicação, controle do temporizador de 5s e manipulação da DOM. |
| **Vite** | Ferramenta de build responsável por minificar o código e otimizar o carregamento de mídia. |
| **Web3Forms API** | Endpoint seguro para envio de formulários diretamente para o e-mail sem backend próprio. |
| **GA4 Native** | Coleta de dados de navegação e engajamento. |

---

## 🔗 Links Oficiais do Projeto

*   🌍 **Acesse a Aplicação em Produção:** https://cumaru-receitas.netlify.app/
*   💼 **Desenvolvedor Responsável:** [Thiago Henrique — LinkedIn](https://www.linkedin.com/in/thiago-lima-271138270/)
*   💻 **Confira meu Portfólio Principal:** [Thiago.dev](https://thiagolima-dev.vercel.app/)
*   💬 **Orçamentos e Contato:** [Conversar no WhatsApp](https://wa.me/5531995263774)

---

## ⚙️ Como Executar o Projeto Localmente

1. Clone este repositório:
```bash
git clone https://github.com/ThiagoLLimas/projeto-culinaria.git
```
Entre na pasta do projeto:
```bash
cd projeto-culinaria
```
Instale as dependências do Vite:
```bash
npm install
```
Execute o projeto localmente:
```bash
npm run dev
```
