FROM ubi8/nodejs-16:1-42 as build-step

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

RUN npm run build

FROM ubi8/nginx-120:1-44
COPY --from=build-step /app/build /usr/share/nginx/html