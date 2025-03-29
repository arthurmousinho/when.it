"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

const examplePrompts = [
    'Como solicitar férias?',
    'Onde encontro os formulários de RH?',
    'Como acessar o sistema interno?',
    'Quais são os horários de expediente?',
]

export default function ChatbotPage() {
    return (
        <div
            className="flex flex-col gap-6 w-full pb-6"
            style={{
                height: "calc(100vh - 73px)",
            }}
        >
            <main className="flex flex-col flex-1 items-center justify-center h-full">
                <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">
                    Olá, Como posso te ajudar?
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                    {examplePrompts.map((prompt, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="p-6 hover:bg-primary/10 hover:text-primary text-primary"
                        >
                            <Sparkles />
                            {prompt}
                        </Button>
                    ))}
                </div>
            </main>
            <footer className="w-full bottom-0 left-0 flex justify-center bg-white">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="flex flex-col items-center bg-white rounded-xl 
                    border border-gray-300 p-2 max-w-4xl w-full"
                >
                    <Textarea
                        placeholder="Digite sua mensagem aqui..."
                        className="w-full border-0 focus-visible:ring-0 
                        focus-visible:ring-offset-0 px-2 h-[50px] resize-none shadow-none"
                    />
                    <div className="w-full flex justify-end">
                        <Button type="submit" className="rounded-xl px-4">
                            Enviar Mensagem
                        </Button>
                    </div>
                </form>
            </footer>
        </div>
    );
}
