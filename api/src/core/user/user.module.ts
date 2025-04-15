import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { UserService } from './user.service';

@Module({
    imports: [

    ],
    controllers: [

    ],
    providers: [
        PrismaService,
        UserService
    ],
    exports: [
        UserService
    ]
})

export class UserModule { }