import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { StorageService } from './infra/storage.service';
import { DocumentService } from './document.service';
import { VectorService } from './infra/vector.service';
import { DocumentController } from './document.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OrganizationModule } from '../organization/organization.module';
import { AIModule } from 'src/infra/ai/ai.module';

@Module({
  imports: [
    NestjsFormDataModule,
    OrganizationModule,
    AIModule
  ],
  controllers: [
    DocumentController
  ],
  providers: [
    PrismaService,
    StorageService,
    VectorService,
    DocumentService
  ],
  exports: [
    DocumentService,
    VectorService
  ]
})

export class DocumentModule { }