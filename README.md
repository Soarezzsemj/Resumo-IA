# 📘 Resumo-IA  

_Gerador de resumos automáticos usando Google Gemini, Node.js, TypeScript e React._

## 🌐 Acesso ao Projeto

🔗 **Frontend (Vercel):**  
https://resumo-ia.vercel.app/

---

## 🏷️ Badges

![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

---

## 🚀 Visão Geral

O **Resumo-IA** é uma aplicação full-stack que gera resumos automáticos em português utilizando o modelo **Google Gemini 2.5-Flash**.

Este projeto combina:

- **Frontend** em React + Vite (Vercel)  
- **Backend** em Node.js + TypeScript + Express (Render)  
- **Integração direta com IA da Google**

---

## ✨ Funcionalidades

- 🧠 Geração automática de resumos  
- 🎨 Interface limpa e responsiva  
- 🔄 Sistema de carregamento visual  
- 🌐 API REST com Express  
- ⚙️ Deploy otimizado (Render + Vercel)

---

## 📁 Estrutura do Projeto
```
├── 📁 Backend
│   ├── 📁 src
│   │   ├── 📄 aiService.ts
│   │   ├── 📄 checkModels.ts
│   │   ├── 📄 index.ts
│   │   ├── 📄 routes.ts
│   │   ├── 📄 server.ts
│   │   ├── 📄 summarizer.ts
│   │   └── 📄 summarryController.ts
│   ├── 🐳 Dockerfile
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── ⚙️ tsconfig.json
├── 📁 frontend
│   ├── 📁 public
│   │   ├── 📄 favicon.ico
│   │   ├── 🌐 index.html
│   │   ├── 🖼️ logo192.png
│   │   ├── 🖼️ logo512.png
│   │   ├── ⚙️ manifest.json
│   │   └── 📄 robots.txt
│   ├── 📁 src
│   │   ├── 📁 components
│   │   │   ├── 🎨 InputBar.module.css
│   │   │   ├── 📄 InputBar.tsx
│   │   │   ├── 🎨 SummaryBar.module.css
│   │   │   └── 📄 SummaryBar.tsx
│   │   ├── 📁 pages
│   │   ├── 📁 services
│   │   ├── 🎨 App.css
│   │   ├── 📄 App.test.tsx
│   │   ├── 📄 App.tsx
│   │   ├── 🎨 index.css
│   │   ├── 📄 index.tsx
│   │   ├── 🖼️ logo.svg
│   │   ├── 📄 react-app-env.d.ts
│   │   ├── 📄 reportWebVitals.ts
│   │   └── 📄 setupTests.ts
│   ├── ⚙️ .gitignore
│   ├── ⚙️ package-lock.json
│   ├── ⚙️ package.json
│   └── ⚙️ tsconfig.json
└── ⚙️ .gitignore
```


---

## 🛠️ Tecnologias

### **Backend**
- Node.js  
- TypeScript  
- Express  
- CORS  
- Dotenv  
- Google Generative AI SDK  
- Docker  
- Render  

### **Frontend**
- React  
- Vite  
- TypeScript  
- CSS  
- Vercel  


## 🌍 Deploy

### **Backend (Render)**

- **Root Directory** → `Backend`
- **Dockerfile Path** → `Backend/Dockerfile`
- **Variáveis** → `GEMINI_API_KEY`
- **Porta** → `process.env.PORT`

---

### **Frontend (Vercel)**

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Variável:** `VITE_API_URL`

---

## 📡 Endpoints

### **POST /api/summary**
Gera um resumo usando o modelo Gemini.

---

## 👤 Autor

Desenvolvido por **Carlos Eduardo (Soarezz)** 🇧🇷  
Contribuições e sugestões são sempre bem-vindas!

