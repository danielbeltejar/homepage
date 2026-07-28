FROM cgr.dev/chainguard/python:latest-dev AS builder

WORKDIR /build
RUN python -m venv /venv
COPY requirements.txt .
RUN /venv/bin/pip install --no-cache-dir -r requirements.txt

FROM cgr.dev/chainguard/python:latest

ENV PYTHONUNBUFFERED=1 \
    PATH=/venv/bin \
    PYTHONPATH=/app

COPY --from=builder /venv /venv
COPY . /app
WORKDIR /app

EXPOSE 8000

ENTRYPOINT ["/venv/bin/python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
