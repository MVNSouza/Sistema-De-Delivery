# 🍔 Sistema de Delivery

Este projeto é um sistema de delivery composto por **backend (Django)** e **frontend (React com Vite)**.  
A ideia é manter os dois no mesmo repositório (**monorepo**), mas cada um roda separadamente.

---

## 📂 Estrutura do Projeto
```
SISTEMA-DE-DELIVERY/
│── api/              # Backend (Django + Docker)
│   ├── app/
│   ├── core/
│   ├── manage.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── docker-compose.yml
│
│── app/              # Frontend (React + Vite)
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── App.jsx
│       ├── main.jsx
│       └── ...
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

### 🔹 2. Rodar o **Backend (API)**
O backend está em Django e roda via **Docker Compose**.

1. Acesse a pasta do backend:
   `cd api`

2. Suba os containers:
   `docker-compose up --build`

3. A API estará disponível em:
   `http://localhost:8000`

---

### 🔹 3. Rodar o **Frontend (App)**
O frontend está em **React com Vite**.

1. Acesse a pasta do frontend:
   `cd app`

2. Instale as dependências:
   `npm install`

3. Rode o servidor de desenvolvimento:
   `npm run dev`

4. O frontend estará disponível em:
   `http://localhost:5173`

---

## ⚡ Comunicação Frontend ↔ Backend

- O **frontend (React)** faz requisições para o **backend (Django)**.  
- Configure a URL base da API no frontend, geralmente algo como:

`const API_URL = "http://localhost:8000"`;

---

## 🛠️ Tecnologias Utilizadas

- **Backend:** Django, Django REST Framework, Docker, Docker Compose  
- **Frontend:** React, Vite, JavaScript (ES6+)  
- **Banco de Dados:** (SQLite ou outro configurado no docker-compose.yml)  

---

## 👨‍💻 Autores
<div display="grid" justify-content="start" grid-template-columns="1fr 1fr">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=MVNSouza&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=MVNSouza">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=Mateus-RF&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=Mateus-RF">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=lupercioneto&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=lupercioneto">
<img align="right" width="380px" height="auto" src="https://github-readme-stats.vercel.app/api?username=digg0&show_icons=true&theme=dracula&hide_border=true&locale=pt-BR&custom_title=digg0">
</div>
