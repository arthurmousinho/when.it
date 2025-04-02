import type { InviteStatus } from "@/@types/invite";
import { Badge } from "@/components/ui/badge";
import { Check, Send } from "lucide-react";

type Props = {
    status: InviteStatus;
}


export function InviteStatusBadge({ status }: Props) {

    function getVariant() {
        switch (status) {
            case "PENDING":
                return "outline";
            case "ACCEPTED":
                return "default";
        }
    }

    function getIcon() {
        switch (status) {
            case "PENDING":
                return <Send size={20} />;
            case "ACCEPTED":
                return <Check size={20} />;
        }
    }

    function getLabel() {
        switch (status) {
            case "PENDING":
                return "ENVIADO";
            case "ACCEPTED":
                return "ACEITO";
        }
    }

    return (
        <Badge
            variant={getVariant()}
        >
            {getIcon()}
            {getLabel()}
        </Badge>
    )
}