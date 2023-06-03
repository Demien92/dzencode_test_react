FROM node:14.17.0
WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]