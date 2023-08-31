# Use the official Nginx image as the base image
FROM nginx:stable-alpine-slim

# Copy your HTML website files to the Nginx webroot directory
COPY ./public/ /usr/share/nginx/html

# Copy your custom nginx.conf to the Nginx configuration directory
COPY ./nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
