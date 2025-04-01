"use client";

import type React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { uploadDocumentAction, type UploadDocumentActionData } from "./actions";
import { toast } from "sonner";
import { useParams } from "next/navigation";

const formSchema = z.object({
    name: z
        .string()
        .min(3, { message: "O nome do documento deve ter pelo menos 3 caracteres." })
        .max(20, { message: "O nome do documento deve ter no máximo 20 caracteres." }),
    description: z
        .string()
        .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
        .max(100, { message: "A descrição deve ter no máximo 100 caracteres." }),
    file: z
        .any()
        .refine((files) => files instanceof FileList && files.length > 0, {
            message: "É necessário selecionar um arquivo.",
        })
});

type FormValues = z.infer<typeof formSchema>;

export function UploadDocumentForm() {

    const { slug } = useParams();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            file: undefined,
        },
    });

    const { handleSubmit, isLoading } = useFormState<UploadDocumentActionData>({
        action: uploadDocumentAction,
        onSuccess: (sucessMessage) => {
            form.reset();
            toast.success(sucessMessage);
        },
        onError: (errorMessage) => {
            toast.error(errorMessage);
        },
    });

    function onSubmit(values: FormValues) {
        const file = values.file[0] as File;
        handleSubmit({
            name: values.name,
            description: values.description,
            organizationSlug: slug as string,
            file,
        });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <FilePlus className="mr-2 h-4 w-4" />
                    Adicionar Documento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Adicionar Novo Documento</DialogTitle>
                    <DialogDescription>Preencha as informações e faça upload do documento</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome do Documento</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Ex: Normas de Convivência"
                                            {...field}
                                        />
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
                                            placeholder="Breve descrição do documento"
                                            rows={4}
                                            className="resize-none h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="file"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Arquivo</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="file"
                                            placeholder="Selecione um arquivo"
                                            onChange={(e) => field.onChange(e.target.files)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" isLoading={isLoading}>
                                Salvar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}