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
- 🔗 Extração de artigos por URL
- 📄 Importação de arquivos `.txt` e `.pdf`
- 🎛️ Formato, tom e idioma configuráveis  
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
- **Variável:** `REACT_APP_API_URL` (opcional; padrão aponta para o backend publicado)

---

## ⚙️ Configuração do backend

Além de `GEMINI_API_KEY`, o backend aceita:

- `GEMINI_FALLBACK_MODEL`: modelo usado se a listagem falhar (padrão `gemini-2.5-flash`).
- `GEMINI_MODEL_CACHE_TTL_MS`: validade do cache em memória (padrão 24 horas).
- `GEMINI_MODEL_LOCK`: trava uma versão específica e desativa a descoberta automática.
- `ALLOW_EXPERIMENTAL_MODELS=true`: permite modelos `preview`, `experimental` e `exp`.
- `GEMINI_REQUEST_TIMEOUT_MS`, `MAX_TEXT_LENGTH` e `MAX_TEXT_WORDS`: timeout e limites de entrada.

Em operação normal, o serviço consulta `v1beta/models`, mantém apenas modelos com `flash` e
`generateContent`, descarta versões experimentais e escolhe a maior versão numérica. O resultado
fica em cache. Se a atualização falhar, usa o último modelo cacheado; sem cache, usa
`GEMINI_FALLBACK_MODEL`. A resposta de resumo inclui `model` e `fallback`, e a rota de diagnóstico
`/api/model-info` expõe o estado atual. A função pura `selectLatestFlashModel` pode ser testada
com listas simuladas para cobrir versões, sufixos e ausência de candidatos.

## 📡 Endpoints

### **POST /api/summary**
Gera um resumo usando o modelo Gemini. Aceita JSON com `text`, `format` (`topics`,
`paragraph` ou `tldr`), `tone` (`formal`, `casual` ou `technical`), `language`
(`pt-BR`, `en` ou `es`) e `url`. Ao enviar `url`, o backend extrai o conteúdo
principal da página antes de resumir.

Também aceita `multipart/form-data` com o campo `file` para `.txt` ou `.pdf`.

### POST /api/extract-file

Recebe um arquivo `.txt` ou `.pdf` em `multipart/form-data` e devolve o texto
extraído para preencher a área de edição antes do envio.

### GET /api/model-info

Exibe o modelo selecionado, a origem da seleção e se o serviço está usando fallback.

---

## 👤 Autor

Desenvolvido por **Carlos Eduardo (Soarezz)** 🇧🇷  
Contribuições e sugestões são sempre bem-vindas!
