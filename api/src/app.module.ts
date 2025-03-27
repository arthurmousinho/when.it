import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';
import { OrganizationModule } from './modules/organization/organization.module';

@Module({
  imports: [
    AuthModule,
    DocumentModule,
    OrganizationModule
  ]
})

export class AppModule { }