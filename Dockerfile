FROM nginx:1.31-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY index.html 404.html impressum.html datenschutz.html /usr/share/nginx/html/
COPY en /usr/share/nginx/html/en
COPY assets /usr/share/nginx/html/assets
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
