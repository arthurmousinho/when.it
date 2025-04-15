import { Module } from '@nestjs/common';
import { DocumentModule } from './core/document/document.module';
import { OrganizationModule } from './core/organization/organization.module';
import { MemberModule } from './core/member/member.module';
import { EmailModule } from './infra/email/email.module';
import { InviteModule } from './core/invite/invite.module';
import { ChatModule } from './core/chat/chat.module';
import { AIModule } from './infra/ai/ai.module';
import { MessageModule } from './core/message/message.module';
import { AuthModule } from './core/auth/auth.module';


@Module({
  imports: [
    AuthModule,
    DocumentModule,
    OrganizationModule,
    MemberModule,
    EmailModule,
    InviteModule,
    ChatModule,
    AIModule,
    MessageModule
  ]
})

export class AppModule { }