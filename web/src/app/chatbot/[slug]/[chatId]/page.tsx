import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getChatMessages } from "@/http/message/get-chat-messages.http";
import { Send } from "lucide-react";
import { ChatMessage } from "./chat-message";
import { ScrollArea } from "@/components/ui/scroll-area";


type Props = {
    params: {
        chatId: string;
    }
}

export default async function ChatPage({ params: { chatId } }: Props) {
    const { messages } = await getChatMessages(chatId)

    return (
        <div className="w-full h-dvh flex flex-col p-4">
            <div className="flex-1 flex justify-center overflow-hidden">
                <main className="w-full max-w-[70%] flex flex-col gap-4 overflow-y-auto scrollbar-hidden">
                    {messages.map(msg => (
                        <ChatMessage 
                            key={msg.id}
                            content={msg.content}
                            authorType={msg.authorType}
                        />
                    ))}
                </main>
            </div>
            <footer className="mt-4 flex justify-center">
                <form className="flex flex-col items-center bg-white rounded-xl border border-gray-300 p-3 w-full max-w-[70%]">
                    <Textarea
                        placeholder="Digite sua mensagem aqui..."
                        className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-2 h-[30px] resize-none shadow-none text-black"
                    />
                    <div className="w-full flex justify-end mt-2">
                        <Button type="submit">
                            <Send className="w-4 h-4 mr-2" />
                            Enviar
                        </Button>
                    </div>
                </form>
            </footer>
        </div>
    )
}
