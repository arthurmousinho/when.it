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
import { signUpUserAction } from "./actions";
import { toast } from "sonner"
import { loginUserAction } from "../login/actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const formSchema = z.object({
    name: z
        .string({ message: "Nome inválido" })
        .trim()
        .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
    email: z
        .string({ message: "Email é obrigatório" })
        .trim()
        .email({ message: "Email inválido" }),
    password: z
        .string({ message: "Senha inválida" })
        .trim()
        .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
})

export function SignUpForm() {

    const router = useRouter();

    const [isLoading, startTransition] = useTransition();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            const response = await signUpUserAction(values);

            if (response.success === false) {
                toast.error(response.message)
                return
            }

            await loginUserAction({
                email: values.email,
                password: values.password
            });

            router.push("/manager");
        })
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
                                    placeholder="John Doe"
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="johndoe@exemplo.com"
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
                        href="/auth/login"
                        className="text-sm text-primary hover:underline underline-offset-4"
                    >
                        Já tem uma conta? Faça login
                    </Link>
                    <Button type="submit" isLoading={isLoading}>
                        Criar conta
                    </Button>
                </footer>
            </form>
        </Form>
    )
}
