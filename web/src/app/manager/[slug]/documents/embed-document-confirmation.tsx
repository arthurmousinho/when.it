"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { embedDocumentAction, type EmbedDocumentActionData } from "./actions";
import { useFormState } from "@/hooks/use-form-state";
import { Button } from "@/components/ui/button";

type Props = {
    documentId: string;
    children: React.ReactNode;
};

export function EmbedDocumentConfirmation({ children, documentId }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const { handleSubmit, isLoading } = useFormState<EmbedDocumentActionData>({
        action: embedDocumentAction,
        onSuccess: (successMessage) => {
            toast.success(successMessage);
            setIsOpen(false);
        },
        onError: (errorMessage) => {
            toast.error(errorMessage);
        },
    });

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger
                asChild
                className="flex flex-row items-center gap-4 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(true);
                }}
            >
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Confirmar integração do documento
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Ao confirmar, o documento será embedado e ficará disponível
                        para o chatbot responder perguntas relacionadas.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => setIsOpen(false)}
                        disabled={isLoading}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit({ documentId });
                        }}
                        asChild
                    >
                        <Button isLoading={isLoading} type="submit">
                            Confirmar
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}