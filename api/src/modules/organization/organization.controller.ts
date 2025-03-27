import { Body, Controller, Post, UseGuards } from "@nestjs/common";
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

}