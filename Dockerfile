
FROM node:16-alpine

RUN apk add --no-cache libc6-compat
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

WORKDIR /app

COPY --chown=nextjs:nodejs package.json package-lock.json ./
RUN npm install --production

COPY --chown=nextjs:nodejs . .
ENV NEXT_PUBLIC_API_BASE_URL ${NEXT_PUBLIC_API_BASE_URL}
RUN yarn build

EXPOSE 3000
ENV PORT 3000

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

USER nextjs

CMD ["yarn", "start"]
