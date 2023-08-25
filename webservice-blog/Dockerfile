FROM python:3.11-slim
ENV PYTHONUNBUFFERED 1

# Set the working directory for the application
WORKDIR /app

# Copy the application files
COPY . .

# Install project dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port
EXPOSE 8000

# Run the application with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]