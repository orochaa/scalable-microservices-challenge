FROM node:22 as pnpm
RUN npm install -g pnpm

FROM pnpm as modules
WORKDIR /api
COPY /package.json ./
RUN pnpm install

FROM modules as base
COPY /prisma ./prisma
COPY /src ./src
COPY /tsconfig* ./
COPY /nest* ./

FROM base as development
ENV NODE_ENV=development

FROM base as production
ENV NODE_ENV=production
RUN pnpm prisma generate
RUN pnpm build
RUN chown -R node /api
USER node
