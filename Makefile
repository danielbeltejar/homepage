.PHONY: dev dev-admin build rebuild rebuild-% down clean seed logs logs-% test test-backend test-frontend lint help status restart

COMPOSE := $(shell command -v podman-compose 2>/dev/null || echo "podman compose")

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Start all services with hot-reload
	$(COMPOSE) up --build -d
	@echo ""
	@echo "Services running:"
	@echo "  Frontend:       http://localhost:3000 (vite hmr)"
	@echo "  Admin Panel:    http://localhost:3001"
	@echo "  Posts API:      http://localhost:8001"
	@echo "  Admin API:      http://localhost:8002 (uvicorn reload)"
	@echo "  Admin login:    admin / admin"

dev-admin: ## Start admin + posts only
	$(COMPOSE) up --build -d admin-back admin-front posts

build: ## Build all images
	$(COMPOSE) build

rebuild: ## Rebuild all without cache
	$(COMPOSE) build --no-cache

rebuild-%: ## Rebuild specific service without cache (e.g. make rebuild-front)
	$(COMPOSE) build --no-cache $*

down: ## Stop + remove containers
	$(COMPOSE) down

clean: ## Stop + remove containers + volumes
	$(COMPOSE) down -v

seed: ## Copy posts into shared volume
	bash scripts/seed-posts.sh

logs: ## Tail all logs
	$(COMPOSE) logs -f

logs-%: ## Tail service logs (e.g. make logs-front)
	$(COMPOSE) logs -f $*

test: test-backend test-frontend ## Run all tests

test-backend: ## Backend tests
	cd admin-back && pip install -q -r requirements.txt pytest httpx && python -m pytest tests/ -v
	cd posts && pip install -q -r requirements.txt pytest httpx && python -m pytest tests/ -v

test-frontend: ## Frontend tests
	cd admin-front && npm test
	cd front && npm test -- --run

lint: ## Run linters
	cd admin-back && pip install -q ruff && ruff check .
	cd admin-front && npx tsc --noEmit

status: ## Show service status
	$(COMPOSE) ps

restart: ## Restart all services
	$(COMPOSE) restart
