FROM node:10
WORKDIR /code
COPY package.json ./
# COPY ormconfig.json /code/
# COPY spec /code/spec
COPY dist /code/dist
RUN npm install --only=prod
EXPOSE 5000

ENTRYPOINT ["node", "dist/index.js"]
