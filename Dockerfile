# syntax=docker/dockerfile:1.2
FROM node:20-alpine as builder

# ser build environment
ARG VITE_API_ENDPOINT

WORKDIR /build
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .

RUN pnpm build

# running stage 
FROM socialengine/nginx-spa:latest
WORKDIR /app
COPY --from=builder /build/dist /app
RUN chmod -R 777 /app