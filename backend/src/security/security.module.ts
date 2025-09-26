import { Module } from '@nestjs/common';
import { SecurityController } from './security.controller';
import { CommonSecurityModule } from '../common/common-security.module';

@Module({
  imports: [CommonSecurityModule],
  controllers: [SecurityController],
})
export class SecurityModule {}
