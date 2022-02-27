FROM node:16-alpine3.11

ENV LANG=ko_KR.UTF-8 \
    LANGUAGE=ko_KR.UTF-8

RUN apk --no-cache add tzdata && \
        cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
        echo "Asia/Seoul" > /etc/timezone

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package.json ./

RUN npm install

COPY ./ ./

RUN npm run build

CMD ["node", "dist/main"]
