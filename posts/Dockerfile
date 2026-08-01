FROM cgr.dev/chainguard/python:latest-dev AS builder

WORKDIR /build
RUN python -m venv venv
COPY requirements.txt .
ENV PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
RUN /build/venv/bin/pip install --no-cache-dir -r requirements.txt \
    && rm -rf /build/venv/lib/python*/site-packages/pip \
              /build/venv/lib/python*/site-packages/pip-*.dist-info \
              /build/venv/lib/python*/site-packages/setuptools \
              /build/venv/lib/python*/site-packages/setuptools-*.dist-info

FROM cgr.dev/chainguard/python:latest

ENV PYTHONUNBUFFERED=1 \
    PATH=/venv/bin \
    PYTHONPATH=/app

COPY --from=builder /build/venv /venv
COPY . /app
WORKDIR /app

EXPOSE 8000

ENTRYPOINT ["/venv/bin/python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
