#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$ROOT_DIR/backend"
FRONTEND_DIR="$ROOT_DIR/frontend"

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[1;34m'
RESET='\033[0m'

section() {
  printf "\n${BLUE}==> %s${RESET}\n" "$1"
}

success() {
  printf "${GREEN}✔ %s${RESET}\n" "$1"
}

fail() {
  printf "${RED}✖ %s${RESET}\n" "$1"
}

run_step() {
  local description="$1"
  shift
  section "$description"
  if "$@"; then
    success "$description"
  else
    fail "$description"
    exit 1
  fi
}

maybe_npm_ci() {
  local dir="$1"
  if [[ ! -d "$dir/node_modules" || "${CI_FORCE_NPM_CI:-0}" == "1" ]]; then
    run_step "npm ci in $(basename "$dir")" bash -c "cd '$dir' && npm ci"
  else
    printf "${YELLOW}Skipping npm ci in %s (node_modules detected). Export CI_FORCE_NPM_CI=1 to force.${RESET}\n" "$(basename "$dir")"
  fi
}

section "Running local CI checks (mirrors GitHub Actions)"

maybe_npm_ci "$BACKEND_DIR"
run_step "backend lint" bash -c "cd '$BACKEND_DIR' && npm run lint"
run_step "backend unit tests" bash -c "cd '$BACKEND_DIR' && npm run test -- --watch=false"
if [[ "${SKIP_E2E:-0}" == "1" ]]; then
  printf "${YELLOW}Skipping backend e2e tests (SKIP_E2E=1).${RESET}\n"
else
  run_step "backend e2e tests" bash -c "cd '$BACKEND_DIR' && npm run test:e2e"
fi
run_step "backend build" bash -c "cd '$BACKEND_DIR' && npm run build"

maybe_npm_ci "$FRONTEND_DIR"
run_step "frontend lint" bash -c "cd '$FRONTEND_DIR' && npm run lint"
run_step "frontend type-check" bash -c "cd '$FRONTEND_DIR' && npm run type-check"
run_step "frontend build" bash -c "cd '$FRONTEND_DIR' && npm run build"

if [[ "${SKIP_DOCKER_BUILDS:-0}" == "1" ]]; then
  printf "${YELLOW}Skipping Docker image builds (SKIP_DOCKER_BUILDS=1).${RESET}\n"
else
  run_step "docker build backend" docker build -t hikari-backend:ci "$BACKEND_DIR"
  run_step "docker build frontend" docker build -t hikari-frontend:ci "$FRONTEND_DIR"
fi

success "All local CI checks completed"
printf "Use ${GREEN}git status${RESET} to review changes before committing.\n"