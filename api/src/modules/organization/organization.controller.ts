import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateOrganizationDTO } from "./dtos/create-organization.dto";
import { OrganizationService } from "./organization.service";
import { AuthGuard } from "../auth/providers/auth.guard";
import { DecodedToken } from "../auth/providers/decoded-token.decorator";
import { OrganizationRoles, OrganizationRoleGuard } from "../auth/providers/organization-role.guard";

@UseGuards(AuthGuard, OrganizationRoleGuard)
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
            description: data.description,
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
    @OrganizationRoles('MANAGER')
    public async getDashboard(
        @Param('slug') slug: string
    ) {
        const dashboard = await this.organizationService.getDashboard(slug);
        return { dashboard };
    }


}