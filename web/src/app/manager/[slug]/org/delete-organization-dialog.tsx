'use client'

import { Button } from "@/components/ui/button";
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
import { Trash } from "lucide-react";
import { useFormState } from "@/hooks/use-form-state";
import { deleteOrganizationAction } from "./actions";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    organizationSlug: string;
}

export function DeleteOrganizationDialog({ organizationSlug }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const { handleSubmit, isLoading } = useFormState<string>({
        action: deleteOrganizationAction,
        onSuccess: (successMessage) => {
            toast.success(successMessage);
            setIsOpen(false);
            router.push('/orgs')
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
                <Button variant="outline" type="submit">
                    <Trash size={20} />
                    Excluir Organização
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Confirmar exclusão da organização ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Ao confirmar, tudo relacionado à esta organização será permanentemente excluido
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleSubmit(organizationSlug);
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
    )
}