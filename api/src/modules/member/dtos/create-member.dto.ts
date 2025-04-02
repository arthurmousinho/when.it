import type { MemberRole } from "@prisma/client";

export class CreateMemberDTO {

    role: MemberRole;

    userId: string;

    organizationId: string;

}