import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { MessageService } from "./message.service";
import { OrganizationModule } from "../organization/organization.module";
import { ChatModule } from "../chat/chat.module";
import { AIModule } from "../ai/ai.module";
import { MessageController } from "./message.controller";
import { DocumentModule } from "../document/document.module";

@Module({
    imports: [
        OrganizationModule,
        ChatModule,
        AIModule,
        DocumentModule
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