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
    name: z
        .string({ message: "Nome inválido" })
        .trim()
        .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    organizationName: z
        .string({ message: "Nome da organização inválido" })
        .trim()
        .min(3, { message: "Nome da organização deve ter no mínimo 3 caracteres" }),
    organizationDomain: z
        .string({ message: "Domínio da organização inválido" })
        .trim()
        .regex(
            /^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/,
            { message: "Domínio da organização inválido" }
        ),
    password: z
        .string({ message: "Senha inválida" })
        .trim()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
})

export function SignUpForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            organizationName: "",
            organizationDomain: "",
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nome
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Seu nome completo"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="organizationName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nome da Organização
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Nome da sua instituição"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="organizationDomain"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Domínio da Organização
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="escola.com"
                                    type="text"
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
                        href="/auth/login"
                        className="text-sm text-primary hover:underline underline-offset-4"
                    >
                        Já tem uma conta? Faça login
                    </Link>
                    <Button type="submit">
                        Criar conta
                    </Button>
                </footer>
            </form>
        </Form>
    )
}
