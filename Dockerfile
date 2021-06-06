FROM node:14

WORKDIR /opt/eo-proj
ADD ./eo_app/ /opt/eo-proj

RUN npm i

EXPOSE 8080

CMD npm run start