FROM python:3.12-alpine AS builder
ARG PYTHON_VERSION=3.12

RUN pip install --upgrade pip

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

FROM gcr.io/distroless/python3.12:nonroot
ARG PYTHON_VERSION=3.12

ENV PYTHONUNBUFFERED 1

COPY --from=builder /usr/local/lib/python${PYTHON_VERSION}/site-packages /usr/local/lib/python${PYTHON_VERSION}/site-packages
COPY --from=py-build /usr/local/bin/uvicorn /app/uvicorn

COPY . /app
WORKDIR /app

EXPOSE 8000

ENV PYTHONPATH=/usr/local/lib/python${PYTHON_VERSION}/site-packages

CMD ["/app/uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
ENV PYTHONPATH=/usr/local/lib/python${PYTHON_VERSION}/site-packages