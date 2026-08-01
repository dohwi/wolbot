# --- 빌드 스테이지 ---
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# --- 런타임 스테이지 ---
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# ponytail: wol.json은 상태 파일. 컨테이너 내부 /app 에 마운트해서 유지.
RUN touch wol.json
CMD ["node", "dist/index.js"]