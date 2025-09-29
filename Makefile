# Hikari Makefile
.PHONY: help build up down logs clean test seed

# Default target
help: ## Show this help message
	@echo "Hikari Development Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development commands
dev-up: ## Start development environment
	docker-compose -f docker-compose.dev.yml up -d

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-build: ## Build development images
	docker-compose -f docker-compose.dev.yml build

# Production commands
up: ## Start production environment
	docker-compose up -d

down: ## Stop production environment
	docker-compose down

logs: ## Show production logs
	docker-compose logs -f

build: ## Build production images
	docker-compose build

# Database commands
seed: ## Run database seeds
	docker-compose -f docker-compose.dev.yml exec backend-dev npm run seed

db-reset: ## Reset database (warning: destroys all data)
	docker-compose -f docker-compose.dev.yml down -v
	docker-compose -f docker-compose.dev.yml up -d db-dev
	@echo "Waiting for database to be ready..."
	@sleep 10
	docker-compose -f docker-compose.dev.yml up -d backend-dev
	@echo "Database reset complete"

# Testing commands
test: ## Run all tests
	cd backend && npm test

test-e2e: ## Run e2e tests
	cd backend && npm run test:e2e

test-cov: ## Run tests with coverage
	cd backend && npm run test:cov

# Utility commands
clean: ## Clean up containers and volumes
	docker-compose down -v --remove-orphans
	docker-compose -f docker-compose.dev.yml down -v --remove-orphans
	docker system prune -f

install: ## Install dependencies
	cd backend && npm install
	cd frontend && npm install

frontend-dev: ## Run Next.js dev server
	cd frontend && npm run dev -- --port 3001

lint: ## Run linting
	cd backend && npm run lint

format: ## Format code
	cd backend && npm run format

# Docker commands
docker-build: ## Build all Docker images
	docker build -t hikari-backend:latest ./backend
	docker build -t hikari-frontend:latest ./frontend

docker-push: ## Push images to registry (requires login)
	docker push hikari-backend:latest
	docker push hikari-frontend:latest

# Health checks
health: ## Check service health
	@echo "Checking backend health..."
	@curl -f http://localhost:3000/health || echo "Backend not responding"
	@echo ""
	@echo "Checking database connection..."
	@docker-compose -f docker-compose.dev.yml exec -T db-dev pg_isready -U hikari_user -d hikari || echo "Database not ready"

# Development workflow
dev-setup: ## Complete development setup
	make install
	make dev-build
	make dev-up
	@echo "Waiting for services to start..."
	@sleep 15
	make seed
	@echo ""
	@echo "Development environment ready!"
	@echo "Backend: http://localhost:3000"
	@echo "Frontend: http://localhost:3001"
	@echo "Database Admin: http://localhost:8080"
	@echo "API Docs: http://localhost:3000/api"

# Production workflow
prod-deploy: ## Deploy to production
	make build
	make up
	@echo "Production environment deployed!"
