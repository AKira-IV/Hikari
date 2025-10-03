# Hikari Makefile
.PHONY: help build up down logs clean test seed local-dev docker-check

# Default target
help: ## Show this help message
	@echo "Hikari Development Commands:"
	@echo ""
	@echo "🐳 Docker Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | grep -E "(dev-|up|down|build)" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "💻 Local Development Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | grep -E "(local-|start-|install)" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "🔧 Utility Commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | grep -E "(clean|test|seed|logs)" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Docker check
docker-check: ## Check if Docker is running
	@docker version > /dev/null 2>&1 || (echo "❌ Docker is not running. Please start Docker Desktop first." && exit 1)
	@echo "✅ Docker is running"

# Development commands (Docker)
dev-up: docker-check ## Start development environment with Docker
	docker-compose -f docker-compose.dev.yml up -d

dev-down: ## Stop development environment
	docker-compose -f docker-compose.dev.yml down

dev-logs: ## Show development logs
	docker-compose -f docker-compose.dev.yml logs -f

dev-build: docker-check ## Build development images
	docker-compose -f docker-compose.dev.yml build

# Local development commands (without Docker)
local-install: ## Install dependencies locally
	@echo "📦 Installing backend dependencies..."
	cd backend && npm install
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install
	@echo "✅ Dependencies installed"

local-dev: ## Start local development servers
	@echo "🚀 Starting Hikari in local development mode..."
	@echo "⚠️  Make sure PostgreSQL is running on localhost:5432"
	@echo "📋 Database: hikari_user:hikari_password@localhost:5432/hikari"
	@echo ""
	@echo "Starting backend on port 3000..."
	@echo "Starting frontend on port 3001..."
	@bash -c "cd backend && npm run start:dev &"
	@bash -c "cd frontend && npm run dev &"
	@echo "✅ Services started! Check:"
	@echo "   Frontend: http://localhost:3001"
	@echo "   Backend:  http://localhost:3000"

start-backend: ## Start only backend locally
	cd backend && npm run start:dev

start-frontend: ## Start only frontend locally
	cd frontend && npm run dev

start-storybook: ## Start Storybook
	cd frontend && npm run storybook

# Database commands
start-db-docker: docker-check ## Start only PostgreSQL with Docker
	docker run --name hikari-postgres \
		-e POSTGRES_USER=hikari_user \
		-e POSTGRES_PASSWORD=hikari_password \
		-e POSTGRES_DB=hikari \
		-p 5432:5432 \
		-d postgres:15-alpine
	@echo "✅ PostgreSQL started on localhost:5432"

stop-db-docker: ## Stop PostgreSQL Docker container
	docker stop hikari-postgres || true
	docker rm hikari-postgres || true

# Production commands
up: docker-check ## Start production environment
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

ci-check: ## Run local CI (lint, tests, build, docker)
	./scripts/run-ci-checks.sh
