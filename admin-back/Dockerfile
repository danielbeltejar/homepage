FROM cgr.dev/chainguard/python:latest-dev@sha256:b08980b41611a3887dfca3823286a84b2b8557c70ec7f151265c1d53fd67c68e AS builder

WORKDIR /build
RUN python -m venv venv
COPY requirements.txt .
ENV PYO3_USE_ABI3_FORWARD_COMPATIBILITY=1
RUN /build/venv/bin/pip install --no-cache-dir -r requirements.txt \
    && rm -rf /build/venv/lib/python*/site-packages/pip \
              /build/venv/lib/python*/site-packages/pip-*.dist-info \
              /build/venv/lib/python*/site-packages/setuptools \
              /build/venv/lib/python*/site-packages/setuptools-*.dist-info

FROM cgr.dev/chainguard/python:latest@sha256:e2554b2ab18fc6d3a22f249245f8a8cf866687441b38273ffd5e0f3e37009e00

ENV PYTHONUNBUFFERED=1 \
    PATH=/venv/bin \
    PYTHONPATH=/app

COPY --from=builder /build/venv /venv
COPY . /app
WORKDIR /app

EXPOSE 8000

ENTRYPOINT ["/venv/bin/python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
