import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CloudinaryService } from './infra/claudinary.service';
import { DocumentService } from './document.service';
import { PineconeService } from './infra/pinecone.service';
import { DocumentController } from './document.controller';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { OrganizationModule } from '../organization/organization.module';

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
    CloudinaryService,
    PineconeService,
    DocumentService
  ],
})

export class DocumentModule { }