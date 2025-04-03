import { UsersRound, FileText, Zap } from "lucide-react";
import Image from "next/image";
import chatBotImage from "@/assets/illustrations/chatbot.svg"

const features = [
    {
        icon: <Zap className="size-6 text-primary" />,
        title: "Respostas em tempo real",
        description: "Obtenha informações precisas em segundos, não em horas."
    },
    {
        icon: <FileText className="size-6 text-primary" />,
        title: "Integração inteligente com documentos",
        description: "Utilize os documentos da sua empresa para responder as perguntas."
    },
    {
        icon: <UsersRound className="size-6 text-primary" />,
        title: "Gerenciamento de Membros",
        description: "Acompanhe os colaboradores durante o uso da plataforma."
    }
];

export function FeaturesSection() {
    return (
        <section className="w-full grid grid-cols-2 items-center gap-20">
            <div>
                <Image
                    src={chatBotImage}
                    alt="when.it"
                />
            </div>
            <aside>
                <h2 className="text-2xl font-bold tracking-tight">
                    Potencialize seu ambiente corporativo
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mt-2">
                    Com tecnologia RAG (Retrieval Augmented Generation), nossa plataforma torna o acesso e o compartilhamento de informações entre colaboradores mais rápido e eficiente.
                </p>
                <ul className="space-y-6 mt-6">
                    {features.map((feature, index) => (
                        <li
                            className="flex items-center justify-start gap-3"
                            key={index}
                        >
                            <div className="rounded-md bg-primary/10 p-2 border">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="font-medium text-slate-900">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </aside>
        </section>
    );
}