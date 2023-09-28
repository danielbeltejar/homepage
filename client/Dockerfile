# Use the official Nginx image as the base image
FROM ghcr.io/nginxinc/nginx-unprivileged:stable-alpine-slim

# Copy your HTML website files to the Nginx webroot directory
COPY ./public/ /usr/share/nginx/html

# Copy your custom nginx.conf to the Nginx configuration directory
COPY ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /var/cache/nginx

RUN apk --no-cache add shadow && usermod -u 10001 nginx && \
    groupmod -g 10001 nginx

RUN apk del shadow

RUN chown -R nginx:nginx /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

WORKDIR /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
