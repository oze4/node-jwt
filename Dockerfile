FROM node

ARG MONGO_STRING
ARG MONGO_AUTH_DB
ARG JWT_SIGNATURE
ARG JWT_ENCRYPTION_KEY
ARG PORT=80

ENV MONGO_STRING=${MONGO_STRING}
ENV MONGO_AUTH_DB=${MONGO_AUTH_DB}
ENV JWT_SIGNATURE=${JWT_SIGNATURE}
ENV JWT_ENCRYPTION_KEY=${JWT_ENCRYPTION_KEY}
ENV PORT=${PORT}

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN yarn install

COPY . .

EXPOSE ${PORT}
CMD ["npm", "start"]