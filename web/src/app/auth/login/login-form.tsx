"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";

const formSchema = z.object({
    email: z
        .string({ message: "Email inválido" })
        .trim()
        .email({ message: "Email inválido" }),
    password: z
        .string({ message: "Senha inválida" })
        .trim()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
})

export function LoginForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email Institucional
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="aluno@escola.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Senha
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="*********"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="flex items-center justify-between">
                    <Link
                        href="/auth/signup"
                        className="text-sm text-primary hover:underline underline-offset-4"
                    >
                        Não tem uma conta? Cadastre-se
                    </Link>
                    <Button type="submit">
                        Entrar
                    </Button>
                </footer>
            </form>
        </Form>
    )
}