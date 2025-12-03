# ---------- Etapa 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala dependências (incluindo devDependencies para compilar TS)
RUN npm install

# Copia o restante do código
COPY tsconfig*.json ./
COPY src ./src

# Compila TypeScript
RUN npm run build


# ---------- Etapa 2: Runtime ----------
FROM node:18-alpine

WORKDIR /app

# Copia apenas os arquivos necessários para rodar
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

# Define a porta (Render usa ela automaticamente)
ENV PORT=3000
EXPOSE 3000

# Inicia o backend
CMD ["node", "dist/server.js"]
