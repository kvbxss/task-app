FROM node:20

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 4200

CMD ["npm", "start"]