FROM oven/bun:1 AS deps
COPY package.json bun.lock /app/
WORKDIR /app
RUN bun install --frozen-lockfile

FROM oven/bun:1 AS build
COPY . /app/
COPY --from=deps /app/node_modules /app/node_modules
WORKDIR /app
RUN bun run build

# Runtime: Node, not Bun. react-router-serve needs renderToPipeableStream
# which is missing from react-dom/server.bun.js. Don't try to alias it.
FROM node:24-alpine
COPY package.json bun.lock /app/
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
WORKDIR /app
EXPOSE 3000
CMD ["npx", "react-router-serve", "./build/server/index.js"]
