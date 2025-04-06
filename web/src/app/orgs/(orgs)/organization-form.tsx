'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createOrganizationAction } from "./actions";
import { useFormState } from "@/hooks/use-form-state";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    name: z
        .string({ message: 'Nome da organização é obrigatório' })
        .min(3, { message: 'Nome da organização deve ter no mínimo 3 caracteres' })
        .max(50, { message: 'Nome da organização deve ter no máximo 50 caracteres' }),
    description: z
        .string({ message: 'Descrição da organização é obrigatória' })
        .min(3, { message: 'Descrição da organização deve ter no mínimo 3 caracteres' })
        .max(200, { message: 'Descrição da organização deve ter no máximo 200 caracteres' }),
})

export function OrganizationForm() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: ''
        },
    })

    type FormData = z.infer<typeof formSchema>;

    const { handleSubmit, isLoading } = useFormState<FormData>({
        action: createOrganizationAction,
        onSuccess: (sucessMessage) => {
            form.reset();
            toast.success(sucessMessage);
        },
        onError: (errorMessage) => {
            toast.error(errorMessage);
        },
    });

    function onSubmit(data: FormData) {
        handleSubmit(data);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Acme Inc." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descrição</FormLabel>
                            <FormControl>
                                <Textarea 
                                    className="resize-none h-[100px]"
                                    placeholder="Descreva a atividade da sua organização" 
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <footer className="flex justify-end">
                    <Button type="submit" isLoading={isLoading}>
                        Salvar
                    </Button>
                </footer>
            </form>
        </Form>
    )
}