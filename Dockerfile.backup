FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci && npm cache clean --force

COPY . .
RUN npm install && npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

EXPOSE 3002

CMD ["npm", "start", "--", "-p", "3002"]
