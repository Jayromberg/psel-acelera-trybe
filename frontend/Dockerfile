FROM node:hydrogen-alpine
WORKDIR /frontend
COPY package*.json .
RUN yarn install
COPY . .
ENTRYPOINT [ "yarn" ]
CMD ["start"]