import { Button } from "@/components/ui/button"
import { Bot, Play } from "lucide-react"
import { HomeAnimatedGradientText } from "../../components/home-animated-gradient-text"
import { HeroAnimatedFAQ } from "../../components/home-animated-faq"

export function HeroSection() {
    return (
        <section className="w-full max-w-[1200px] flex justify-between gap-10 items-center">
            <aside className="w-[60%] space-y-4">
                <div className="w-[300px]">
                    <HomeAnimatedGradientText />
                </div>
                <h1 className="text-5xl font-bold tracking-tighter ">
                    Transforme sua experiência de trabalho
                    com o poder da I.A
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed w-[80%]">
                    Conecte seus funcionários e facilite o acesso as informacoes da sua empresa
                    por meio de um chatbot.
                </p>
                <footer className="space-x-2">
                    <Button>
                        <Bot />
                        Vamos começar!
                    </Button>
                    <Button variant="outline">
                        <Play />
                        Ver demo
                    </Button>
                </footer>
            </aside>
            <div className="w-[40%]">
                <HeroAnimatedFAQ />
            </div>
        </section>
    )
}