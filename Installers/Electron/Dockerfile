FROM node:slim

COPY . /usr/scr/app

#RUN rm bdstart.sh

RUN npm install --save-dev electron

RUN npm install

#ENV FRESHINSTALL=true

CMD ["/usr/scr/app/start.sh"]
