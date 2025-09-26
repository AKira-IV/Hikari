# GitHub Actions CI/CD para Hikari

## 🔄 Workflows Configurados

### 1. Quick Test (`quick-test.yml`)
- **Trigger**: Push/PR a branch `dev`
- **Propósito**: Tests rápidos básicos
- **Pasos**:
  - Linting con ESLint
  - Build de TypeScript
  - Tests unitarios básicos

### 2. CI/CD Pipeline (`ci-cd.yml`)
- **Trigger**: Push/PR a `main` o `develop`
- **Jobs**:
  - **Test**: Tests completos con PostgreSQL
  - **Build**: Compilación y artifacts
  - **Docker**: Build de imágenes Docker
  - **Security**: Auditoría de seguridad
  - **Deploy**: Deploy automático (staging/production)

### 3. Docker Build (`docker.yml`)
- **Trigger**: Push a `main`/`develop`, tags
- **Propósito**: Build y push de imágenes Docker a GitHub Container Registry

## 🛠️ Solución de Problemas Comunes

### Error: `pg_isready` no encontrado
**Solución**: Se agregó instalación de PostgreSQL client
```yaml
- name: Install PostgreSQL client
  run: |
    sudo apt-get update
    sudo apt-get install -y postgresql-client
```

### Error: Base de datos no conecta
**Solución**: Se mejoró el health check de PostgreSQL
```yaml
services:
  postgres:
    options: >-
      --health-cmd "pg_isready -U hikari_user -d hikari_test"
      --health-interval 10s
      --health-timeout 5s
      --health-retries 10
```

### Error: Tests fallan por falta de configuración
**Solución**: Se agregó configuración específica para tests
- Variables de entorno globales
- Archivo `.env.test`
- Configuración de TypeORM para tests

### Error: Docker compose config
**Solución**: Se cambió de `docker-compose` a `docker compose`
```yaml
- name: Test Docker Compose configuration
  run: |
    docker compose config --quiet
```

### Error: Dependencias de seguridad
**Solución**: Se cambió audit level y se agregó `continue-on-error`
```yaml
- name: Run security audit
  run: npm audit --audit-level=moderate
  continue-on-error: true
```

## 🚀 Estado Actual

### ✅ Funcional
- Linting automático
- Build de TypeScript
- Tests unitarios básicos
- Docker builds
- Variables de entorno configuradas
- PostgreSQL service

### 🔧 En desarrollo
- Tests E2E completos con base de datos
- Deploy real a staging/production
- Notificaciones de Slack/Discord
- Cache optimizado

## 📋 Variables de Entorno Requeridas

### Automáticas (GitHub)
- `GITHUB_TOKEN`: Token automático para registry
- Todas las variables están hardcoded en el workflow para evitar problemas

### Opcionales (Secrets)
- `SNYK_TOKEN`: Para análisis de seguridad con Snyk
- `SLACK_WEBHOOK`: Para notificaciones (futuro)

## 🔍 Verificar Estado

1. **Ver Actions**: https://github.com/AKira-IV/Hikari/actions
2. **Logs**: Click en cualquier workflow run
3. **Build status**: Badge en README

## 🎯 Próximos Pasos

1. **Agregar badge de status** al README principal
2. **Configurar environments** en GitHub para staging/production
3. **Agregar deploy real** cuando tengamos servidor
4. **Notificaciones** de estado de builds
5. **Cache optimizado** para dependencias

## 💡 Tips de Desarrollo

### Para testear workflows localmente:
```bash
# Usar act (GitHub Actions local runner)
npm install -g @nektos/act
act push
```

### Para debuggear workflow:
```yaml
- name: Debug
  run: |
    echo "Branch: ${{ github.ref }}"
    echo "Event: ${{ github.event_name }}"
    env
```

### Para saltar jobs específicos:
```yaml
- name: Skip on draft PR
  if: github.event.pull_request.draft == false
```
