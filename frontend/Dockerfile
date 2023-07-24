FROM node:hydrogen-alpine
WORKDIR /frontend
COPY package*.json .
RUN yarn install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "yarn" ]
CMD ["start"]