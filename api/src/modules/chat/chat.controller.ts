import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DecodedToken } from '../auth/decoded-token.decorator';
import { AuthGuard } from '../auth/auth.guard';

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

}