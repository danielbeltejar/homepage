# Use the official Nginx image as the base image
FROM cgr.dev/chainguard/nginx:latest

# Copy your HTML website files to the Nginx webroot directory
COPY ./public/ /usr/share/nginx/html

# Copy your custom nginx.conf to the Nginx configuration directory
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 for Nginx
EXPOSE 8080