# Use the official Nginx image as the base image
FROM ghcr.io/nginxinc/nginx-unprivileged:stable-alpine-slim

# Copy your HTML website files to the Nginx webroot directory
COPY ./public/ /usr/share/nginx/html

# Copy your custom nginx.conf to the Nginx configuration directory
COPY ./nginx.conf /etc/nginx/nginx.conf

# Create necessary directories
RUN mkdir -p /var/cache/nginx

# Switch to the root user temporarily to make changes
USER root

# Add 'shadow' package, update 'nginx' user ID and group ID
RUN apk --no-cache add shadow && usermod -u 10001 nginx && groupmod -g 10001 nginx

# Remove the 'shadow' package to reduce image size
RUN apk del shadow

# Change ownership of directories and files
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Create a PID file and adjust its ownership
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Switch back to the 'nginx' user
USER nginx

# Set the working directory
WORKDIR /usr/share/nginx/html

# Expose port 8080 for Nginx
EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
