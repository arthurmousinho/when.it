"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShieldUser, UserRound } from "lucide-react"
import { sendInviteAction, type SendInviteActionData } from "./actions"
import { useFormState } from "@/hooks/use-form-state"
import { toast } from "sonner"
import { useParams } from "next/navigation"

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "O email é obrigatório" })
        .email({ message: "Email inválido" }),
    role: z
        .union([
            z.literal("MEMBER"),
            z.literal("MANAGER")
        ])
})

type FormValues = z.infer<typeof formSchema>

export function InviteMemberForm() {

    const { slug } = useParams();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            role: "MEMBER",
        },
    })

    const { handleSubmit, isLoading } = useFormState<SendInviteActionData>({
        action: sendInviteAction,
        onSuccess: (sucessMessage) => {
            form.reset();
            toast.success(sucessMessage);
        },
        onError: (errorMessage) => {
            toast.error(errorMessage);
        },
    });

    function onSubmit(data: FormValues) {
        handleSubmit({
            organizationSlug: slug as string,
            ...data,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@exemplo.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cargo</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione um cargo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="MEMBER">
                                        <UserRound />
                                        Membro
                                    </SelectItem>
                                    <SelectItem value="MANAGER">
                                        <ShieldUser />
                                        Gerente
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="flex justify-end">
                    <Button type="submit" isLoading={isLoading}>
                        Enviar
                    </Button>
                </footer>
            </form>
        </Form>
    )
}