import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DecodedToken } from '../auth/decoded-token.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SendPromptDTO } from './dtos/send-prompt.dto';

@UseGuards(AuthGuard)
@Controller('chats')
export class ChatController {

    constructor(
        private readonly chatService: ChatService
    ) { }

    @Post('organization/:organizationSlug')
    public async createChat(
        @Param('organizationSlug') organizationSlug: string,
        @DecodedToken() decodedToken: DecodedToken,
    ) {
        const chat = await this.chatService.create({
            userId: decodedToken.userId,
            organizationSlug
        });
        return { chat }
    }

    @Post('organization/:organizationSlug/prompt')
    public async sendPrompt(
        @Body() data: SendPromptDTO,
        @Param('organizationSlug') organizationSlug: string,
        @DecodedToken() decodedToken: DecodedToken,
    ) {
        const message = await this.chatService.sendPrompt({
            ...data,
            userId: decodedToken.userId,
            organizationSlug,
        })
        return { message }
    }

}