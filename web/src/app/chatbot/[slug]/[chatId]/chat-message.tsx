import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Bot } from "lucide-react"
import type { MessageAuthor } from "@/@types/message";

interface ChatMessageProps {
    content: string;
    authorType: MessageAuthor
    className?: string
}

export function ChatMessage({ content, className, authorType}: ChatMessageProps) {

    const isUser = authorType === 'MEMBER';

    return (
        <div className={cn("flex w-full items-start gap-2 py-2", isUser ? "justify-end" : "justify-start", className)}>
            {!isUser && (
                <Avatar className="h-8 w-8 bg-primary/10 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                </Avatar>
            )}

            <Card className="max-w-[60%] bg-muted p-4">
                <CardContent className="text-sm p-0 m-0 leading-relaxed">
                    {content}
                </CardContent>
            </Card>

            {isUser && (
                <Avatar className="h-8 w-8 bg-primary">
                    <AvatarImage />
                </Avatar>
            )}
        </div>
    )
}
