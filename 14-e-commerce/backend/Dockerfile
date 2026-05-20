# ─────────────────────────────────────────────
#  Stage 1 — deps
#  Install production dependencies only
# ─────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev


# ─────────────────────────────────────────────
#  Stage 2 — runtime
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner

# dumb-init: proper PID 1 / signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV NODE_ENV=production
ENV PORT=5001

EXPOSE 5001

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
