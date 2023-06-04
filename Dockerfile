FROM amd64/nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/app /usr/share/nginx/html
