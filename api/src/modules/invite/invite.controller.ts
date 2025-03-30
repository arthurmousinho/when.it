import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { InviteService } from "./invite.service";
import { CreateInviteDTO } from "./dtos/create-invite.dto";
import { DecodedToken } from "../auth/decoded-token.decorator";
import { AuthGuard } from "../auth/auth.guard";

@UseGuards(AuthGuard)
@Controller('invites')
export class InviteController {

    constructor(
        private readonly inviteService: InviteService
    ) { }

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

}