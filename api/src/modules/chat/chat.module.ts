import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/database/prisma.service';
import { MemberModule } from '../member/member.module';
import { OrganizationModule } from '../organization/organization.module';
import { AIModule } from '../ai/ai.module';
import { DocumentModule } from '../document/document.module';

@Module({
    imports: [
        OrganizationModule,
        MemberModule,
        AIModule,
        DocumentModule
    ],
    controllers: [
        ChatController
    ],
    providers: [
        PrismaService,
        ChatService
    ]
})

export class ChatModule { }