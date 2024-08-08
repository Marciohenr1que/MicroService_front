# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o contêiner
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação para o contêiner
COPY . .

# Exponha a porta 5173
EXPOSE 5173

# Comando para iniciar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
