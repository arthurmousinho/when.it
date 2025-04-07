import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { DocumentModule } from './modules/document/document.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { MemberModule } from './modules/member/member.module';
import { EmailModule } from './modules/email/email.module';
import { InviteModule } from './modules/invite/invite.module';
import { ChatModule } from './modules/chat/chat.module';
import { AIModule } from './modules/ai/ai.module';
import { MessageModule } from './modules/message/message.module';

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