import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { MessageService } from "./message.service";
import { OrganizationModule } from "../organization/organization.module";
import { ChatModule } from "../chat/chat.module";
import { MessageController } from "./message.controller";
import { AIModule } from "src/infra/ai/ai.module";
import { GetOrganizationMessagesUseCase } from "./usecases/get-organization-messages.usecase";

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
        MessageService,
        GetOrganizationMessagesUseCase
    ],
    exports: [],
})
export class MessageModule { }