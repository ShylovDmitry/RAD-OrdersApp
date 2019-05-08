FROM node:10

WORKDIR /app

COPY . .

RUN npm install --unsafe-perm

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
