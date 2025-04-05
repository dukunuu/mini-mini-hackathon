FROM node:22.14.0-alpine

WORKDIR /code

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=4096

COPY ./frontend/package*.json .
RUN npm install

EXPOSE 5173

# CMD ["npm", "run", "start:dev"]

