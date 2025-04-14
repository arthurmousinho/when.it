"use client"

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import errorImage from "@/assets/illustrations/error.svg";

export default function ErrorPage() {
    return (
        <div className="w-full h-dvh flex items-center justify-center">
            <div className="flex items-center justify-center w-full mt-20">
                <main className="flex flex-row items-center gap-10">
                    <Image
                        src={errorImage}
                        width={250}
                        alt="Erro"
                        className="mx-auto"
                    />
                    <div className="space-y-4 max-w-[500px]">
                        <h3 className="text-xl font-semibold tracking-tight">
                            Oops! Algo deu errado.
                        </h3>
                        <p className="text-muted-foreground text-base">
                            Não conseguimos processar sua solicitação. Verifique a URL ou tente novamente mais tarde.
                            Estamos trabalhando para corrigir o problema o quanto antes.
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