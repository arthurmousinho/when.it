import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { StorageService } from './infra/storage.service';
import { DocumentService } from './document.service';
import { VectorService } from './infra/vector.service';
import { DocumentController } from './document.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OrganizationModule } from '../organization/organization.module';
import { EmbeddingService } from './infra/embedding.service';

@Module({
  imports: [
    NestjsFormDataModule,
    OrganizationModule
  ],
  controllers: [
    DocumentController
  ],
  providers: [
    PrismaService,
    StorageService,
    VectorService,
    EmbeddingService,
    DocumentService
  ],
  exports: [
    DocumentService,
    VectorService
  ]
})

export class DocumentModule { }