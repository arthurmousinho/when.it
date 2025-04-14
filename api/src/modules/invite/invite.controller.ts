import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { CreateInviteDTO } from "./dtos/create-invite.dto";
import { DecodedToken } from "../auth/decoded-token.decorator";
import { AuthGuard } from "../auth/guards/auth.guard";

@Controller('invites')
export class InviteController {

    constructor(
        private readonly inviteService: InviteService
    ) { }

    @UseGuards(AuthGuard)
    @Post('/organization/:organizationSlug')
    public async sendInvite(
        @Param('organizationSlug') organizationSlug: string,
        @Body() data: CreateInviteDTO,
        @DecodedToken() decodedToken: DecodedToken
    ) {
        const invite = await this.inviteService.create({
            ...data,
            organizationSlug,
            userId: decodedToken.userId
        });
        return { invite }
    }

    @Post(':inviteId/accept')
    public async acceptInvite(
        @Param('inviteId') inviteId: string,
        @DecodedToken() decodedToken: DecodedToken
    ) {
        await this.inviteService.acceptInvite({
            inviteId,
            userId: decodedToken.userId
        });
    }

    @UseGuards(AuthGuard)
    @Get('/organization/:organizationSlug')
    public async getOrganizationInvites(
        @Param('organizationSlug') organizationSlug: string
    ) {
        const invites = await this.inviteService.getOrganizationInvites(organizationSlug);
        return { invites }
    }

    @Get(':inviteId')
    public async getById(
        @Param('inviteId') inviteId: string
    ) {
        const invite = await this.inviteService.getById(inviteId);
        return { invite }
    }

}