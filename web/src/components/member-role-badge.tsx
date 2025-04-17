import type { MemberRole } from "@/@types/member";
import { Badge } from "./ui/badge";
import { ShieldUser, UserRound } from "lucide-react";

export function MemberRoleBadge({ role }: { role: MemberRole }) {
    return (
        <Badge
            variant={
                role === "MANAGER"
                    ? "default"
                    : "secondary"
            }
        >
            {role === "MANAGER" ? <ShieldUser /> : <UserRound />}
            {role === "MANAGER" ? "Gerente" : "Membro"}
        </Badge>
    )
}