FROM node:18

WORKDIR /app

COPY package*.json ./

# safer fallback if lock not present
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
