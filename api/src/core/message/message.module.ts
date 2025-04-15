import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { MessageService } from "./message.service";
import { OrganizationModule } from "../organization/organization.module";
import { ChatModule } from "../chat/chat.module";
import { MessageController } from "./message.controller";
import { AIModule } from "src/infra/ai/ai.module";

@Module({
    imports: [
        OrganizationModule,
        ChatModule,
        AIModule,
    ],
    controllers: [
        MessageController
    ],
    providers: [
        PrismaService,
        MessageService
    ],
    exports: [],
})
export class MessageModule { }