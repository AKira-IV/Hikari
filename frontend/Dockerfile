# Usa una imagen base de Node.js
FROM node:16

# Crear y acceder al directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código fuente
COPY . .

# Exponer el puerto en el que se ejecuta la app
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
