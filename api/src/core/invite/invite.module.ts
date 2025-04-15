import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { EmailModule } from 'src/infra/email/email.module';
import { PrismaService } from 'src/infra/database/prisma.service';
import { OrganizationModule } from '../organization/organization.module';
import { MemberModule } from '../member/member.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        EmailModule,
        OrganizationModule,
        MemberModule,
        UserModule
    ],
    controllers: [
        InviteController
    ],
    providers: [
        PrismaService,
        InviteService
    ]
})

export class InviteModule { }