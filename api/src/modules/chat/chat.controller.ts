import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DecodedToken } from '../auth/decoded-token.decorator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { OrganizationRoleGuard, OrganizationRoles } from '../auth/guards/organization-role.guard';

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
        const chats = await this.chatService.getOrganizaionChats(organizationSlug);
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