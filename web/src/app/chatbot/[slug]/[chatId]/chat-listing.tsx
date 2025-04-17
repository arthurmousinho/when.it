'use client'

import type { MessageAuthor } from "@/@types/message";
import { ChatMessage } from "./chat-message";
import { useEffect, useRef } from "react";

type Props = {
    messages: {
        id: string;
        content: string;
        authorType: MessageAuthor,
        chatId: string;
        createdAt: string;
    }[]
}

export function ChatListing({ messages }: Props) {

    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
        <div className="flex-1 flex justify-center overflow-hidden">
            <main className="w-full max-w-[70%] flex flex-col gap-4 overflow-y-auto scrollbar-hide">
                {messages.map(msg => (
                    <ChatMessage
                        key={msg.id}
                        content={msg.content}
                        authorType={msg.authorType}
                    />
                ))}
                <div ref={bottomRef} />
            </main>
        </div>
    )
}