import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import notFoundImage from "@/assets/illustrations/404.svg";

export default function NotFoundPage() {
    return (
        <div className="w-full h-dvh flex items-center justify-center">
            <div className="flex items-center justify-center w-full mt-20">
                <main className="flex flex-row items-center gap-10">
                    <Image
                        src={notFoundImage}
                        width={250}
                        alt="when.it"
                        className="mx-auto"
                    />
                    <div className="space-y-4 max-w-[500px]">
                        <h3 className="text-xl font-semibold tracking-tight">
                            404 | Página não encontrada
                        </h3>
                        <p className="text-muted-foreground text-base">
                            Infelizmente não conseguimos encontrar a página que você está procurando.
                            Verifique se a URL está correta ou tente novamente mais tarde.
                        </p>
                        <Link 
                            className={cn(buttonVariants({ variant: "default" }))}
                            href="/"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para a página inicial
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}