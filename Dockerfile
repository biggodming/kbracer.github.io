FROM nginx:latest

RUN  apt-get update && apt-get install -y curl && apt-get clean

RUN rm /etc/nginx/conf.d/default.conf

COPY cidt.conf /etc/nginx/conf.d/cidt.conf

ADD ./ /cidt

WORKDIR /cidt

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]