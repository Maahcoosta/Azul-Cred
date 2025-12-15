<div align="center">
  <img src="public/img/logo.png" alt="Azul Cred" width="200" />
  <h1>Azul Cred</h1>
  <h3>Azul Cred - saia do vermelho, venha pro azul</h3>
</div>

### Sumário
1. [Introdução](#1-introdução)  
2. [Clonando o projeto](#2-clonando-o-projeto)  
3. [Instalação e configuração local](#3-instalação-e-configuração-local)  
4. [Inicialização](#4-inicialização)  
5. [Arquitetura do projeto](#5-arquitetura-do-projeto)  
6. [Autoria](#6-autoria)  

### 1. Introdução
Aplicação web para captação de leads de crédito. Coleta dados do cliente, exibe tela de confirmação, salva no MySQL e gera link para contato via WhatsApp.

### 2. Clonando o projeto
```bash
git clone https://github.com/Maahcoosta/Azul-Cred.git
cd Azul-Cred
```

### 3. Instalação e configuração local
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie o arquivo `.env` na raiz com as variáveis:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=azulcred
   ```
3. Crie o banco e a tabela executando `database/script.sql` no MySQL.

### 4. Inicialização
Ambiente de desenvolvimento (hot reload):
```bash
npm run dev
```
Produção/local simples:
```bash
npm start
```
Aplicação disponível em `http://localhost:3000`.

### 5. Arquitetura do projeto
```
projeto-azul-cred/
├── database/
│   └── script.sql          # Script de criação do banco/tabela
├── public/                 # Front-end (HTML, CSS, JS, imagens)
│   ├── css/
│   ├── js/
│   ├── img/
│   └── *.html
├── src/                    # Back-end (Node/Express)
│   ├── config/             # Conexão MySQL
│   ├── controllers/        # Regras de negócio (leads)
│   └── routes/             # Rotas da API (/api/leads)
├── server.js               # Ponto de entrada Express
├── package.json
└── README.md
```

### 6. Autoria
- Mayana Costa  
- Usuário: [Maahcoosta](https://github.com/maahcoosta)

