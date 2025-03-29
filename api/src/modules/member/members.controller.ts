import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { MemberService } from "./member.service";
import { AuthGuard } from "../auth/auth.guard";

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

}