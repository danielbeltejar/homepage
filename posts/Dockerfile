FROM python:3.12-alpine

USER root

# Create a non-root user to run the application
RUN adduser -D appuser

# Add 'shadow' package, update 'appuser' user ID and group ID
RUN apk --no-cache add shadow && usermod -u 10001 appuser && groupmod -g 10001 appuser

# Remove the 'shadow' package to reduce image size
RUN apk del shadow

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apk update \
    && apk add --no-cache mariadb-connector-c-dev gcc musl-dev \
    && rm -rf /var/cache/apk/*

# Create the app directory
RUN mkdir /app
COPY . /app
WORKDIR /app

# Change ownership of directories and files
RUN chown -R appuser:appuser /app

# Copy the requirements file and install project dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port
EXPOSE 8000

# Switch to the non-root user
USER appuser

# Run the application with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]