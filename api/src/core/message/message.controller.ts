import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/guards/auth.guard";
import { MessageService } from "./message.service";
import { DecodedToken } from "../auth/decoded-token.decorator";
import { SendPromptMessageDTO } from "./dtos/send-message.dto";
import { GetOrganizationMessagesUseCase } from "./usecases/get-organization-messages.usecase";

@UseGuards(AuthGuard)
@Controller('messages')
export class MessageController {

    constructor(
        private readonly messageService: MessageService,
        private readonly getOrganizationMessagesUseCase: GetOrganizationMessagesUseCase
    ) { }

    @Get('organization/:organizationSlug')
    public async getOrganizationMessages(
        @Param('organizationSlug') organizationSlug: string,
        @Query('page') page = '1',
        @Query('limit') limit = '10',
    ) {
        const response = await this.getOrganizationMessagesUseCase.execute({
            organizationSlug,
            pagination: {
                page: parseInt(page, 10),
                limit: parseInt(limit, 10),
            },
        });
        return response;
    }
    
    @Get('chat/:chatId')
    public async getChatMessages(
        @Param('chatId') chatId: string,
    ) {
        const messages = await this.messageService.getChatMessages(chatId);
        return { messages }
    }

    @Post('organization/:organizationSlug/prompt')
    public async sendPrompt(
        @Body() data: SendPromptMessageDTO,
        @Param('organizationSlug') organizationSlug: string,
        @DecodedToken() decodedToken: DecodedToken,
    ) {
        const { questionMessage, responseMessage } = await this.messageService.sendPromptMessage({
            ...data,
            userId: decodedToken.userId,
            organizationSlug,
        });
        return { questionMessage, responseMessage }
    }

}