FROM node:hydrogen-alpine
WORKDIR /backend
COPY package*.json .
RUN yarn install
COPY . .
EXPOSE 3999
ENTRYPOINT [ "yarn" ]
CMD ["start"]
