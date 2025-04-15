import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { UserModule } from '../../core/user/user.module';
import { OrganizationRoleGuard } from './guards/organization-role.guard';
import { PrismaService } from 'src/infra/database/prisma.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AuthController
  ],
  providers: [
    PrismaService,
    AuthService,
    AuthGuard,
    OrganizationRoleGuard
  ],
})

export class AuthModule { }