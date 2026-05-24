FROM node:20-alpine

WORKDIR /app

# Backend dependencies
COPY package*.json ./
RUN npm install

# Frontend dependencies
COPY client/package*.json ./client/

WORKDIR /app/client
RUN npm install

# Copy all source
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/client
RUN npm run build

# Run backend
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "api/index.js"]