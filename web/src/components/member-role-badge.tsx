import type { MemberRole } from "@/@types/member";
import { Badge } from "./ui/badge";

export function MemberRoleBadge({ role }: { role: MemberRole }) {
    return (
        <Badge
            variant={
                role === "MANAGER"
                    ? "secondary"
                    : "outline"
            }
        >
            {role === "MANAGER" ? "Gerente" : "Membro"}
        </Badge>
    )
}