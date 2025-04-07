"use client"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles } from "lucide-react";

const examplePrompts = [
    "Como solicitar férias?",
    "Onde encontro os formulários de RH?",
    "Como acessar o sistema interno?",
    "Quais são os horários de expediente?",
];

export default function ChatbotWelcomePage() {
    return (
        <div className="w-full h-dvh">
            <div className="flex flex-col items-center justify-center w-full h-dvh">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">
                        Olá, Como posso te ajudar?
                    </h1>
                </div>
                <div className="max-w-3xl w-full">
                    <div className="grid grid-cols-2 gap-2 w-full mb-4">
                        {examplePrompts.map((prompt, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="p-6 hover:bg-primary/10 hover:text-primary text-primary flex items-center gap-2"
                            >
                                <Sparkles className="w-4 h-4" />
                                {prompt}
                            </Button>
                        ))}
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        className="flex flex-col items-center bg-white rounded-xl border border-gray-300 p-3"
                    >
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
                </div>
            </div>
        </div>
    );
}
