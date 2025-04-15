import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { OrganizationRoleGuard, OrganizationRoles } from 'src/core/auth/guards/organization-role.guard';
import { DecodedToken } from 'src/core/auth/decoded-token.decorator';

@UseGuards(AuthGuard, OrganizationRoleGuard)
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

    @Get('organization/:organizationSlug')
    @OrganizationRoles('MANAGER')
    public async getOrganizationChats(
        @Param('organizationSlug') organizationSlug: string,
    ) {
        const chats = await this.chatService.getOrganizationChats(organizationSlug);
        return { chats }
    }

    @Get('organization/:organizationSlug/member')
    public async getMemberChats(
        @Param('organizationSlug') organizationSlug: string,
        @DecodedToken() decodedToken: DecodedToken,
    ) {
        const chats = await this.chatService.getMemberChats({
            userId: decodedToken.userId,
            organizationSlug
        });
        return { chats }
    }

}