import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateOrganizationDTO } from "./dtos/create-organization.dto";
import { OrganizationService } from "./organization.service";
import { AuthGuard } from "../auth/auth.guard";
import { DecodedToken } from "../auth/decoded-token.decorator";

@UseGuards(AuthGuard)
@Controller('organizations')
export class OrganizationController {

    constructor(
        private readonly organizationService: OrganizationService
    ) { }

    @Post('')
    public async create(
        @Body() data: CreateOrganizationDTO,
        @DecodedToken() decodedToken: DecodedToken
    ) {
        return await this.organizationService.create({
            name: data.name,
            managerId: decodedToken.userId
        });
    }

    @Get('')
    public async getAllByUserId(
        @DecodedToken() decodedToken: DecodedToken
    ) {
        const organizations = await this.organizationService.getAllByUserId(decodedToken.userId);
        return { organizations };
    }

    @Get(':slug/dashboard')
    public async getDashboard(
        @Param('slug') slug: string
    ) {
        const dashboard = await this.organizationService.getDashboard(slug);
        return { dashboard };
    }


}