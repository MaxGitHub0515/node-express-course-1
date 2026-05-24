FROM node:20-alpine

WORKDIR /app

# Root backend deps
COPY package*.json ./
RUN npm install

# Frontend deps
COPY client/package*.json ./client/
WORKDIR /app/client
RUN npm install

# Copy everything
WORKDIR /app
COPY . .

# Build frontend
WORKDIR /app/client
RUN npm run build

# Start backend
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "api/index.js"]