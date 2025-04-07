import { Badge } from "@/components/ui/badge";
import { Bot, UserRound } from "lucide-react";
import type { MessageAuthor } from "@/@types/message";

type Props = {
    authorType: MessageAuthor;
}

export function MessageAuthorTypeBadge({ authorType }: Props) {

    function getVariant() {
        switch (authorType) {
            case "MEMBER":
                return "secondary";
            case "AI":
                return "default";
        }
    }

    function getIcon() {
        switch (authorType) {
            case "MEMBER":
                return <UserRound size={20} />;
            case "AI":
                return <Bot size={20} />;
        }
    }

    function getLabel() {
        switch (authorType) {
            case "MEMBER":
                return "MEMBRO";
            case "AI":
                return "BOT";
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