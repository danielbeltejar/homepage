.PHONY: dev dev-admin build down clean seed logs test test-backend test-frontend lint help

COMPOSE_CMD := $(shell command -v podman-compose 2>/dev/null || echo "podman compose")

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Build and start all services
	$(COMPOSE_CMD) up --build -d
	@echo ""
	@echo "Services running:"
	@echo "  Frontend:       http://localhost:3000"
	@echo "  Admin Panel:    http://localhost:3001"
	@echo "  Posts API:      http://localhost:8001"
	@echo "  Admin API:      http://localhost:8002"
	@echo "  Admin login:    admin / admin"

dev-admin: ## Build and start admin + posts services only
	$(COMPOSE_CMD) up --build -d admin-backend admin-frontend posts

build: ## Build all container images
	$(COMPOSE_CMD) build

down: ## Stop and remove all containers
	$(COMPOSE_CMD) down

clean: ## Stop containers and remove volumes
	$(COMPOSE_CMD) down -v

seed: ## Copy existing posts into the shared volume
	bash scripts/seed-posts.sh

logs: ## Tail logs from all services
	$(COMPOSE_CMD) logs -f

logs-admin: ## Tail admin backend logs
	$(COMPOSE_CMD) logs -f admin-backend

test-backend: ## Run backend tests (admin-backend + posts)
	cd admin-backend && pip install -r requirements.txt pytest httpx > /dev/null 2>&1 && python -m pytest tests/ -v
	cd posts && pip install -r requirements.txt pytest httpx > /dev/null 2>&1 && python -m pytest tests/ -v

test-frontend: ## Run frontend tests (admin-frontend + front)
	cd admin-frontend && npm test
	cd front && npm test -- --run

test: test-backend test-frontend ## Run all tests

lint: ## Run linters
	cd admin-backend && pip install ruff > /dev/null 2>&1 && ruff check .
	cd admin-frontend && npx tsc --noEmit

status: ## Show status of all services
	$(COMPOSE_CMD) ps

restart: ## Restart all services
	$(COMPOSE_CMD) restart
