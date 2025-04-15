import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [
    UserModule,
    AuthModule
  ],
  controllers: [
    OrganizationController
  ],
  providers: [
    PrismaService,
    OrganizationService
  ],
  exports: [
    OrganizationService
  ]
})

export class OrganizationModule { }