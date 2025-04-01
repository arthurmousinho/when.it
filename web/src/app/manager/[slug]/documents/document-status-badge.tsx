import type { DocumentStatus } from "@/@types/document";
import { Badge } from "@/components/ui/badge";
import { Bot, FileUp } from "lucide-react";

type Props = {
    status: DocumentStatus;
}

export function DocumentStatusBadge({ status }: Props) {
    return (
        <Badge
            variant={
                status === "UPLOADED"
                    ? "outline"
                    : "default"
            }
        >
            {status === 'UPLOADED' ? <FileUp size={20} /> : <Bot size={20} />}
            {status === 'UPLOADED' ? 'ENVIADO' : 'INTEGRADO'}
        </Badge>
    )
}