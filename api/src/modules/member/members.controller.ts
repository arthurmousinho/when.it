import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { MemberService } from "./member.service";
import { AuthGuard } from "../auth/auth.guard";
import { DecodedToken } from "../auth/decoded-token.decorator";

@UseGuards(AuthGuard)
@Controller('members')
export class MemberController {

    constructor(
        private readonly memberService: MemberService
    ) { }

    @Get('/organization/:organizationSlug')
    public async getOrganizationMembers(
        @Param('organizationSlug') organizationSlug: string
    ) {
        const members = await this.memberService.getOrganizationMembers(organizationSlug);
        return { members };
    }

    @Get('/organization/:organizationSlug/membership')
    public async getUserMembership(
        @Param('organizationSlug') organizationSlug: string,
        @DecodedToken() decodedToken: DecodedToken,
    ) {
        const member = await this.memberService.getMembership({
            userId: decodedToken.userId,
            organizationSlug
        });

        return { member };
    }

}