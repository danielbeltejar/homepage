# homepage-tailwind

Página personal con panel de administración de entradas de blog. Construida con React + FastAPI y desplegada en Kubernetes.

## Servicios

| Servicio | Descripción | Puerto |
|---|---|---|
| `front` | Frontend público (React + Vite + Tailwind) | 3000 |
| `posts` | API de lectura de posts (FastAPI) | 8001 |
| `admin-back` | API CRUD de administración con JWT (FastAPI) | 8002 |
| `admin-front` | Panel de administración (React + shadcn/ui) | 3001 |
| `apigw` | API Gateway (nginx) | — |

## Desarrollo local

Requiere [Podman](https://podman.io/) y `podman-compose`.

```bash
# Copiar la plantilla de credenciales y configurar el hash de contraseña
cp admin.env.example admin.env

# Arrancar todos los servicios
make dev

# Cargar posts de ejemplo en el volumen compartido
make seed
```

Credenciales por defecto: `admin` / `admin` (configuradas en `admin.env`).

```bash
make help           # listar todos los targets
make test-backend   # ejecutar tests unitarios del backend (17 tests)
make lint           # ruff + tsc
make down           # parar todos los contenedores
make clean          # parar y eliminar volúmenes
```

## Formato de posts

Los posts son ficheros Markdown con front matter delimitado por `$$$`, almacenados en un volumen compartido:

```
$$$
title: "Mi post"
date: "2025-06-11"
author: "Daniel Beltejar"
$$$

Contenido del post aquí.
```

## Despliegue en Kubernetes

Cada servicio tiene su propio chart de Helm en `<servicio>/k8s/`. Se usa un PVC `ReadWriteMany` compartido entre `posts` y `admin-back`.

```bash
helm upgrade --install admin-back ./admin-back/k8s -f ./admin-back/k8s/values-pro.yaml
helm upgrade --install admin-front ./admin-front/k8s -f ./admin-front/k8s/values-pro.yaml
```

Las credenciales de administración se almacenan en un Secret de Kubernetes (`admin-credentials`).

## Stack

- **Frontend**: React 19, Vite 6, Tailwind CSS 3, shadcn/ui
- **Backend**: FastAPI 0.115, Python 3.11, bcrypt, python-jose
- **Infra**: Podman, Kubernetes, Helm, registro Harbor
