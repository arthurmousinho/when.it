import type { InviteStatus } from "@/@types/invite";
import { Badge } from "@/components/ui/badge";
import { Bot, Check, FileUp, Send, X } from "lucide-react";

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
            case "REJECTED":
                return "destructive";
        }
    }

    function getIcon() {
        switch (status) {
            case "PENDING":
                return <Send size={20} />;
            case "ACCEPTED":
                return <Check size={20} />;
            case "REJECTED":
                return <X size={20} />;
        }
    }

    function getLabel() {
        switch (status) {
            case "PENDING":
                return "PENDENTE";
            case "ACCEPTED":
                return "ACEITO";
            case "REJECTED":
                return "REJEITADO";
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