FROM --platform=linux/amd64 python:3.11-alpine AS builder

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

FROM gcr.io/distroless/python3:nonroot
ARG PYTHON_VERSION=3.11

ENV PYTHONUNBUFFERED 1

COPY --from=builder /usr/local/lib/python${PYTHON_VERSION}/site-packages /usr/local/lib/python${PYTHON_VERSION}/site-packages
COPY --from=builder /usr/local/bin/uvicorn /app/uvicorn

COPY . /app
WORKDIR /app

EXPOSE 8000

ENV PYTHONPATH=/usr/local/lib/python${PYTHON_VERSION}/site-packages

CMD ["/app/uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
ENV PYTHONPATH=/usr/local/lib/python${PYTHON_VERSION}/site-packages