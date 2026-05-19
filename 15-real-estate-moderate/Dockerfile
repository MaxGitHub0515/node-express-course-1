FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY api ./api

# copy frontend build
COPY --from=client-build /app/client/dist ./client/dist

EXPOSE 3000

CMD ["node", "api/index.js"]