#!/bin/bash

# Simulador de GitHub Actions Local
# Este script ejecuta exactamente los mismos pasos que tu GitHub Actions

echo "Simulando GitHub Actions localmente..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para logging
log_step() {
    echo -e "${YELLOW}Step: $1${NC}"
}

log_success() {
    echo -e "${GREEN}SUCCESS: $1${NC}"
}

log_error() {
    echo -e "${RED}ERROR: $1${NC}"
}

# Navegar al directorio backend
cd "$(dirname "$0")" || exit 1

log_step "Setting up Node.js environment"
node --version
npm --version

log_step "Installing dependencies"
if npm ci; then
    log_success "Dependencies installed"
else
    log_error "Failed to install dependencies"
    exit 1
fi

log_step "Running linter (ESLint)"
if npm run lint; then
    log_success "Linting passed"
else
    log_error "Linting failed"
    exit 1
fi

log_step "Building TypeScript project"
if npm run build; then
    log_success "Build completed"
else
    log_error "Build failed"
    exit 1
fi

log_step "Running unit tests"
if npm run test; then
    log_success "All tests passed"
else
    log_error "Tests failed"
    exit 1
fi

log_step "Running e2e tests"
if npm run test:e2e; then
    log_success "E2E tests passed"
else
    log_error "E2E tests failed"
    exit 1
fi

echo ""
echo "=================================================="
echo -e "${GREEN}All GitHub Actions steps completed successfully!${NC}"
echo -e "${GREEN}Your code is ready for commit${NC}"
echo "=================================================="
