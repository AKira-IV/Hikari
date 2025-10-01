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
JWT_PRIVATE_KEY=LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUV2Z0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktnd2dnU2tBZ0VBQW9JQkFRRHk4S255eFhEK0VwaE0KaEdVekg5RkdzbWYxNlJSK0NOVWxmM0tFQzI0NG4yUFoxaG9rbDR1Z3VDRWRKbnZmUy83VlFDSjNvdi9uRDdVSQpYN3R5NUNEcnhUdDV1YmZUajdWQ0JSekRIOWVla2ExeGI5RENTYkJSOFBDMVB6VUs2ZnVoVjY2MkJCa1lVTkZqCjlWK0pFdVNHUUh5NHREdzZkYUY3RXlLMWRyMXlKTjNLckJQZ2JnVzZVbjJHWnM2ODJ6UWp1VnpqbUJLaDVTcWwKUWRMMGVQaDYwUjZxRnd6U20ycU0rbnVUeTM4c0M2Y2l5ZFB2RTRSbC9yVVYzVkMwUjc1VHlMaTNDSDFMSDdkRAozKzUzWFE5UlE4S0tZTnV3cnZoOWNabXQ4ZmdGejJLMjdDbzZRSDFkMVFmcm51T0k0VU9SSTJZMkpQZGI2Y2ZoCm1aYmtQOVV6QWdNQkFBRUNnZ0VBYjFNQUZic0xPYW9zdHhlT1JqeWt5aWd6d25paHh0Vm1VdTRSZkZlK2xOeloKUlRlNnVCem53MmpNNTg0OFFrbFJSOGhCWXlCQzhzOThUZytNVnF3YU4rQWtEbllmdWljbTBNK0Y3Qlk1MkxSNQp6YnNHNXhrY1hwZ3h2V1J1K29iWkk0aUtDMmRhVm8ybVBnOXhUVjltYit5NkdtdWhFOHJXaWc3dFAwbGZxNTg3Cmp5eEFlODJ5UDhKVDFoeHFYYmU5MDUyOGptc3BmNWtneHZ6V2JRaXFUNWdBSGlOUGZXb0IwUkJtMWJDRG5MMG8KR3NuUlI5dEJlQWxGQzRRRi9vQThieWZkUU9nR1lVR2wvYkM2NHh4RG80L0dIU2RoZFFvNmtUa0V6amFzZ01uTQpTMWFWcVJLU2J4TTVlOUZPblpqaHA0eXJjcXhiK2xzSmpJUDhSRUF3a1FLQmdRRC8yOWtJTHdFdGkzZ2RueEQ0ClJnWjRTaGhDUjlVbFlzZ0o4eDZEL0ZPZWw4NVhiYWpyLzR3RUpyczk0YmM0RVpPckJZd2I3bGJMcGtoN2dCZ2EKSGh5dkpCcmtySWJ6VDFHTWhpR2UwV1NQbGdGQUJOZ1pRT3lRaitPMHArWk5QbnVjbkFwaE9MWERmd0NUUUF2dQpQYmg3c0gxb1BTbEdYbERBTjQxUnB1SGQ0d0tCZ1FEekV2MmVqeWEvZmhZbGszcVM0dEVqOERTaVMwSnlyUzMxCnplOVpUVTIvM3NuamxTeUQxRGd4QTgwa200ckNoR3A3eU15WmdFdTJEcFBPbXhvT2EyUVJFakROUzhNVnRXa20Kb2tFd2lBdG9mY0hUQTRNSTBaME1CTG9odE90UXNwRmJpRElIaXplYjUrMm5QOUNhVW50VlFERHhuUk10MUJBRgp5ZGJkK0JUTWNRS0JnQlhhMDVrTldzNW5JV1YyVnQ2K0xJTk40UENZYmk1NVY1angrV05ReEZ2Qm45QjcvM2ZaCkpqNmNpRlhxMTlta05yYmZERzYrVncraUxvTE9HRUR5M1lSZ1V5UEJVTzJya3Myc0QyY2ZmN1Y4SExNNU5yUkIKaFhON3R2bVJkZXlYTDd2YTRGQVpwZjBDOWl1ZHh1Y2N3b3RlTWZnYmNWRWZjVXBaOUdwTEZQUDlBb0dCQU5QYgpHWEc1RXV5VDJIbW5zSTJWWXZNUHlOQXJDQjhyRVlQTG1YRWNEMGZMeGVxMWViYnNvSTBYNHhTay9Ldk0vWUlsCjRTMW94SlJJNEVxU3BJTXMxbXFLa0Q1ZWFnbmhzMlFZeHZpbG1rdllUN2E2dU5wVzE2cEI5SGlzVnV4ZXRwSXcKZ21wUXpJYjEvZ3huY2trTzJxL1M0dFd6TWFRZjBGYzdOQ3NDcmg0QkFvR0JBSmdmUUxWalJjOC9tbit3SzFnVgpYeUYrK3ZLY3RMUmFSWFlidHdRWUJ0Y05aS01DcytHdHVwUlpDM2NiYnNBbHE3M0dBby9paUZxSUdtWDlBdEM0CnRwYi84VXd4clJrRVA2Q2lPeGIrSXBOWXRabUpnUXpWaGFWTlBvNVh4S1RxOVJ3UWoyYmEyWEtTY3ZOUm5vYkoKS25FWDJjekVGSzdEVTJVb2VwSUFNMU1UCi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS0K

JWT_PUBLIC_KEY=LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FROUE4dkNwOHNWdy9oS1lUSVJsTXgvUgpSckpuOWVrVWZnalZKWDl5aEF0dU9KOWoyZFlhSkplTG9MZ2hIU1o3MzB2KzFVQWlkNkwvNXcrMUNGKzdjdVFnCjY4VTdlYm0zMDQrMVFnVWN3eC9YbnBHdGNXL1F3a213VWZEd3RUODFDdW43b1ZldXRnUVpHRkRSWS9WZmlSTGsKaGtCOHVMUThPbldoZXhNaXRYYTljaVRkeXF3VDRHNEZ1bEo5aG1iT3ZOczBJN2xjNDVnU29lVXFwVUhTOUhqNApldEVlcWhjTTBwdHFqUHA3azh0L0xBdW5Jc25UN3hPRVpmNjFGZDFRdEVlK1U4aTR0d2g5U3grM1E5L3VkMTBQClVVUENpbURic0s3NGZYR1pyZkg0QmM5aXR1d3FPa0I5WGRVSDY1N2ppT0ZEa1NObU5pVDNXK25INFptVzVEL1YKTXdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==

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
