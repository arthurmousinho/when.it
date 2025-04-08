import { getChatMessages } from "@/http/message/get-chat-messages.http";
import { ChatForm } from "./chat-form";
import { ChatListing } from "./chat-listing";

type Props = {
    params: {
        chatId: string;
        slug: string;
    }
}

export default async function ChatPage({ params: { chatId, slug } }: Props) {

    const { messages } = await getChatMessages(chatId)

    return (
        <div className="w-full h-dvh flex flex-col p-4">
            <ChatListing messages={messages} />
            <footer className="mt-4 flex justify-center">
                <ChatForm
                    slug={slug}
                    chatId={chatId}
                />
            </footer>
        </div>
    )
}
