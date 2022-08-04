FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i && npm install react-scripts

CMD ["npm", "run", "start"]