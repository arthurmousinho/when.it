import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { MemberController } from './members.controller';
import { OrganizationModule } from '../organization/organization.module';
import { MemberService } from './member.service';

@Module({
    imports: [
        OrganizationModule
    ],
    controllers: [
        MemberController
    ],
    providers: [
        PrismaService,
        MemberService
    ],
    exports: [

    ]
})

export class MemberModule { }