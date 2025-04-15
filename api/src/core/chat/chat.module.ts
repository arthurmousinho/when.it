import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from 'src/infra/database/prisma.service';
import { MemberModule } from '../member/member.module';
import { OrganizationModule } from '../organization/organization.module';
import { AuthModule } from 'src/core/auth/auth.module';


@Module({
    imports: [
        AuthModule,
        OrganizationModule,
        MemberModule,
    ],
    controllers: [
        ChatController
    ],
    providers: [
        PrismaService,
        ChatService
    ],
    exports: [
        ChatService
    ]
})

export class ChatModule { }