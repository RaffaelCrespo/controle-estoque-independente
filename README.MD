# Controle de Estoque — São José dos Pinhais

**Sistema web para gerenciamento de estoque**, desenvolvido como projeto acadêmico e de portfólio, com foco no controle de materiais, acompanhamento de quantidades e registro de descartes.

🌐 **[Acessar demonstração online](https://raffaelcrespo.github.io/controle-estoque-independente/)**

💻 **[Visualizar código-fonte no GitHub](https://github.com/RaffaelCrespo/controle-estoque-independente)**

## Sobre o projeto

A aplicação permite cadastrar e gerenciar materiais, acompanhar o estoque disponível, registrar descartes e visualizar indicadores por meio de um dashboard.

O sistema funciona de forma independente, utilizando o armazenamento local do navegador (`localStorage`), sem necessidade de autenticação, banco de dados externo ou infraestrutura de backend.

A aplicação conta com dados fictícios para facilitar a demonstração de suas funcionalidades.

## Demonstração visual

### Tela inicial

![Tela inicial](./screenshots/01-tela-inicial.png)

### Dashboard

![Dashboard](./screenshots/02-dashboard.png)

### Cadastro de materiais

![Cadastro](./screenshots/03-cadastro.png)

### Estoque

![Estoque](./screenshots/04-estoque.png)

### Registro de descarte

![Descarte](./screenshots/05-descarte.png)

### Relatórios

![Relatórios](./screenshots/06-relatorios.png)

## Funcionalidades

- Cadastro de materiais.
- Consulta dos materiais em estoque.
- Edição e exclusão de registros.
- Registro de descarte de materiais.
- Atualização automática das quantidades após descartes.
- Validação da quantidade disponível antes de registrar descartes.
- Dashboard com indicadores.
- Relatórios gráficos por categoria.
- Armazenamento e persistência dos dados no navegador.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- localStorage
- Chart.js
- Font Awesome

## Armazenamento de dados

O projeto utiliza a API `localStorage` do navegador para armazenar os registros da aplicação.

Essa abordagem permite manter os dados salvos mesmo após atualizar ou fechar a página, sem depender de um servidor de banco de dados.

**Limitações do armazenamento local:**

- Os dados ficam vinculados ao navegador e à origem utilizada.
- Não existe sincronização automática entre dispositivos ou navegadores.
- A limpeza dos dados do navegador pode apagar os registros armazenados.
- A demonstração utiliza dados fictícios.

## Como executar o projeto localmente

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto no Visual Studio Code.
3. Abra o arquivo `index.html` utilizando a extensão Live Server.
4. A aplicação será aberta no navegador.

Não é necessário instalar dependências de backend ou configurar um banco de dados.

*Observação: a biblioteca Chart.js e outros recursos externos podem precisar de conexão com a internet para serem carregados.*

## Objetivo

O projeto tem como objetivo aplicar conhecimentos de desenvolvimento web, manipulação do DOM, operações CRUD, armazenamento local, validação de dados e visualização de informações em uma aplicação prática.

## Autor

**Raffael Crespo**