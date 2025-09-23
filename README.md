# 🍔 Sistema de Delivery

Este projeto é um sistema de delivery composto por backend (Django) e frontend (React com Vite).
A ideia é manter os dois no mesmo repositório (monorepo), mas cada um roda separadamente.

---

## 📂 Estrutura do Projeto
```
SISTEMA-DE-DELIVERY/
│── backend/          # Backend (Django + Docker)
│   ├── app/
│   ├── core/
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
│── frontend/         # Frontend (React + Vite)
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
│── .gitignore
│── README.md

```
---

## 🚀 Como Rodar o Projeto

### 🔹 1. Clonar o repositório
`git clone https://github.com/seu-usuario/sistema-de-delivery.git`
`cd sistema-de-delivery`

---

##🔹 2. Rodar o Backend (API)

O backend está em Django e roda via Docker Compose.

Acesse a pasta do backend:
`cd backend`

Suba os containers:
`docker-compose up --build`

A API estará disponível em:
`http://localhost:8000`

---

##🔹 3. Rodar o Frontend (App)

O frontend está em React com Vite.
Acesse a pasta do frontend:
``cd frontend``

Instale as dependências:
``npm install``

Rode o servidor de desenvolvimento:
`npm run dev`

O frontend estará disponível em:
`http://localhost:3000`

---

## ⚡ Comunicação Frontend ↔ Backend

- O **frontend (React)** faz requisições para o **backend (Django)**.  
- Configure a URL base da API no frontend, geralmente algo como:

`const API_URL = "http://localhost:8000"`;

---

## 🛠️ Tecnologias Utilizadas

- **Backend:**  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) 
- **Frontend:** ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 	![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  
- **Banco de Dados:** ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 👨‍💻 Autores
<div display="grid" justify-content="start" grid-template-columns="1fr 1fr">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=MVNSouza&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=MVNSouza">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=Mateus-RF&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=Mateus-RF">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=lupercioneto&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=lupercioneto">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=digg0&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=digg0">
</div>
