# Utilizza l'immagine di base ufficiale di Node.js
FROM node:16

# Imposta la directory di lavoro all'interno del container
WORKDIR /usr/src/app

# Copia il file package.json e il package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice nel container
COPY . .

# Espone la porta 80
EXPOSE 80
