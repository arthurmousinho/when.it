"use client";

import { AnimatedList } from "@/components/magicui/animated-list";
import { cn } from "@/lib/utils";

interface Question {
    question: string;
    category: string;
    icon: string;
    color: string;
    time: string;
}

let commonQuestions = [
    {
        question: "Como redefinir minha senha?",
        icon: "🔑",
        color: "#00C9A7",
        category: "Sistema",
        time: "1 min",
    },
    {
        question: "Onde encontro os relatórios?",
        icon: "📊",
        color: "#FFB800",
        category: "Relatórios",
        time: "2 min atrás",
    },
    {
        question: "Quem contatar para suporte?",
        icon: "🖥️",
        color: "#FF3D71",
        category: "Suporte",
        time: "3 min atrás",
    },
    {
        question: "Qual o horário de atendimento?",
        icon: "⏰",
        color: "#8A2BE2",
        category: "Horário",
        time: "4 min atrás",
    },
];

commonQuestions = Array.from({ length: 10 }, () => commonQuestions).flat();

const QuestionItem = ({ question, category, icon, color, time }: Question) => {
    return (
        <figure
            className={cn(
                "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4",
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: color }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
                        <span className="text-sm sm:text-lg">{question}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {category}
                    </p>
                </div>
            </div>
        </figure>
    );
};

export function HeroAnimatedFAQ({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                "relative flex h-[300px] w-full flex-col overflow-hidden p-2",
                className,
            )}
        >
            <AnimatedList className="w-full">
                {commonQuestions.map((item, idx) => (
                    <QuestionItem {...item} key={idx} />
                ))}
            </AnimatedList>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-50"></div>
        </div>
    );
}
