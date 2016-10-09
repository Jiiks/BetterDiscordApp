FROM node:slim

COPY . /usr/scr/app

RUN apt-get update

RUN apt-get -y install libgtkextra-dev libgconf2-dev libnss3 libasound2 libxtst-dev libxss1

RUN npm install --save-dev electron

RUN npm install

#ENV FRESHINSTALL=true

CMD ["/usr/scr/app/start.sh"]
