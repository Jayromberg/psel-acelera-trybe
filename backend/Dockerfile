FROM node:hydrogen-alpine
WORKDIR /backend
COPY package*.json .
RUN yarn install
COPY . .
ENTRYPOINT [ "yarn" ]
CMD ["start"]
