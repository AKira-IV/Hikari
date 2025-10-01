# JWT Asymmetric Cryptography Configuration

## Security Improvements Applied

### 1. Eliminated Database Query Anti-patterns [COMPLETED]

**Problem**: The seed service was using `findOne()` queries before creating users, violating the principle of trusting database constraints.

**Solution**: Implemented upsert methods using `INSERT ... ON CONFLICT` pattern:
- `upsertDemoTenant()`: Creates or updates tenant using database constraints
- `upsertAdminUser()`, `upsertDoctorUser()`, `upsertNurseUser()`: Create users trusting unique constraints

**Benefits**:
- Eliminates unnecessary queries
- Faster execution
- Relies on database constraints as intended
- Handles concurrency better

### 2. Migrated from Symmetric to Asymmetric JWT [COMPLETED]

**Problem**: JWT was using HS256 (symmetric) algorithm with shared secret, which is less secure.

**Solution**: Implemented RSA-SHA256 (RS256) asymmetric cryptography:
- Private key for signing (server-side only)
- Public key for verification (can be shared)
- More secure than symmetric alternatives

**Future Enhancement**: Upgrade to ED25519 (EdDSA) when @nestjs/jwt supports it - ED25519 is superior to RSA in performance and security.

## Environment Variables Required

Add these environment variables to your `.env` file:

```bash
# RSA 2048 Keys for JWT (Base64 encoded)
# TODO: Upgrade to ED25519 when NestJS supports EdDSA
JWT_PRIVATE_KEY=<your-base64-encoded-private-key>

JWT_PUBLIC_KEY=<your-base64-encoded-public-key>

# JWT Configuration
JWT_EXPIRATION=15m
JWT_ISSUER=hikari-app
JWT_AUDIENCE=hikari-users

# Fallback for development (not recommended for production)
JWT_SECRET=fallback-dev-secret
```

## Key Generation Script

To generate new RSA 2048 keys:

```javascript
const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

console.log('JWT_PRIVATE_KEY=' + Buffer.from(privateKey).toString('base64'));
console.log('JWT_PUBLIC_KEY=' + Buffer.from(publicKey).toString('base64'));
```

For future ED25519 keys (when supported):

```javascript
const crypto = require('crypto');

const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519', {
  publicKeyEncoding: { type: 'spki', format: 'pem' },
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

console.log('JWT_PRIVATE_KEY=' + Buffer.from(privateKey).toString('base64'));
console.log('JWT_PUBLIC_KEY=' + Buffer.from(publicKey).toString('base64'));
```

## Security Benefits

### RSA vs HS256 vs ED25519

| Feature | HS256 (Symmetric) | RS256 (RSA) | ED25519 (Future) |
|---------|------------------|-------------|------------------|
| Key Type | Shared Secret | Private/Public Key Pair | Private/Public Key Pair |
| Key Security | Must be kept secret everywhere | Private key only on auth server | Private key only on auth server |
| Verification | Requires secret | Only needs public key | Only needs public key |
| Algorithm | HMAC with SHA-256 | RSA with SHA-256 | Edwards Curve Digital Signature |
| Key Size | 256 bits | 2048+ bits | 256 bits |
| Performance | Fastest | Slower | Faster than RSA |
| Scalability | Limited (shared secret) | Better (public key distribution) | Best (public key distribution) |
| Side-channel Resistance | N/A | Vulnerable | Resistant |

### Database Query Optimization

**Before (Anti-pattern)**:
```typescript
// ❌ BAD: Unnecessary query before creation
const existing = await this.userRepository.findOne({
  where: { email: 'admin@demo.com' }
});
if (!existing) {
  await this.userRepository.save(newUser);
}
```

**After (Optimized)**:
```typescript
// GOOD: Trust database constraints
await this.userRepository
  .createQueryBuilder()
  .insert()
  .into(User)
  .values(userData)
  .orIgnore() // Handle constraint violations gracefully
  .execute();
```

## Migration Notes

1. **Backward Compatibility**: The system includes fallback to symmetric JWT if asymmetric keys are not configured
2. **Gradual Migration**: Can be deployed without breaking existing tokens during transition
3. **Performance**: ECDSA verification is slightly slower than HMAC but provides better security
4. **Key Management**: Private keys should be stored securely (use secrets management in production)

## Testing

After applying these changes:

1. Verify compilation: `npm run build`
2. Test authentication endpoints
3. Verify that database seeds work without unnecessary queries
4. Check JWT tokens are signed with ES256 algorithm

## Production Recommendations

1. **Key Rotation**: Implement key rotation strategy for long-term security
2. **Secrets Management**: Use proper secrets management (AWS Secrets Manager, Azure Key Vault, etc.)
3. **Monitoring**: Monitor for authentication failures during migration
4. **Backup**: Keep backup of working configuration during migration
