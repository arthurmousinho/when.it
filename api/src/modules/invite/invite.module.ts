import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { EmailModule } from '../email/email.module';
import { PrismaService } from 'src/database/prisma.service';
import { OrganizationModule } from '../organization/organization.module';

@Module({
    imports: [
        EmailModule,
        OrganizationModule
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