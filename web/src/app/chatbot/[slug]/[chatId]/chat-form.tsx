'use client'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { sendPromptMessageAction, type SendPromptMessageActionParams } from "./actions";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
    content: z
        .string({ message: 'A mensagem é obrigatória' })
        .min(2, { message: 'A mensagem deve ter no mínimo 2 caracteres' })
        .max(255, { message: 'A mensagem deve ter no máximo 255 caracteres' }),
})

type Props = {
    chatId: string;
    slug: string;
};

export function ChatForm({ chatId, slug }: Props) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: ''
        },
    })

    type FormData = z.infer<typeof formSchema>;

    const { handleSubmit, isLoading } = useFormState<SendPromptMessageActionParams>({
        action: sendPromptMessageAction,
        onSuccess: () => {
            form.reset()
        },
        onError: (errorMessage) => {
            toast.error(errorMessage);
        },
    });

    async function onSubmit(formData: FormData) {
        await handleSubmit({
            chatId,
            organizationSlug: slug,
            content: formData.content,
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col items-center bg-white rounded-xl border border-gray-300 p-3 w-full max-w-[70%]"
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <Textarea
                                    placeholder="Digite sua mensagem aqui..."
                                    className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none shadow-none text-black"
                                    disabled={isLoading}
                                    {...field}
                                />
                            </FormControl>
                           
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end mt-2">
                    <Button type="submit" isLoading={isLoading} disabled={!form.formState.isValid}>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar
                    </Button>
                </div>
                <FormMessage />
            </form>
        </Form>
    );
}
