"use client"

import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { loginUserAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { useTransition } from "react";

const loginSchema = z.object({
    email: z
        .string({ message: 'Email é obrigatório' })
        .email({ message: 'Email inválido' }),
    password: z
        .string({ message: 'Senha é obrigatória' })
        .trim()
        .min(1, { message: 'Senha é obrigatória' })
})


export function LoginForm() {

    const router = useRouter();

    const [isLoading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof loginSchema>) {
        startTransition(async () => {
            const response = await loginUserAction(values)
            if (response.success === false) {
                toast.error(response.message)
                return
            }
            router.push('/orgs');
        })
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
                    <Button type="submit" isLoading={isLoading}>
                        Entrar
                    </Button>
                </footer>
            </form>
        </Form>
    )
}