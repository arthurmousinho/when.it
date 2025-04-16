import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateOrganizationDTO } from "./dtos/create-organization.dto";
import { OrganizationService } from "./organization.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { DecodedToken } from "../auth/decoded-token.decorator";
import { OrganizationRoles, OrganizationRoleGuard } from "../auth/guards/organization-role.guard";

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

    @Get(':slug')
    @OrganizationRoles('MANAGER')
    public async getBySlug(
        @Param('slug') slug: string
    ) {
        const organization = await this.organizationService.getBySlug(slug);
        return { organization };
    }

    @Get(':slug/dashboard')
    @OrganizationRoles('MANAGER')
    public async getDashboard(
        @Param('slug') slug: string
    ) {
        const dashboard = await this.organizationService.getDashboard(slug);
        return { dashboard };
    }

    @Put(':slug')
    @OrganizationRoles('MANAGER')
    public async update(
        @Param('slug') slug: string,
        @Body() data: CreateOrganizationDTO,
    ) {
        const organization = await this.organizationService.update({
            ...data,
            organizationSlug: slug
        });
        return { organization };
    }

}