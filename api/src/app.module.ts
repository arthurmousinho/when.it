import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';

@Module({
  imports: [
    AuthModule,
    DocumentModule
  ]
})

export class AppModule { }