FROM nginx:1.27-alpine

COPY apps/qingce/script/nginx.conf /etc/nginx/conf.d/default.conf
COPY apps/qingce/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
