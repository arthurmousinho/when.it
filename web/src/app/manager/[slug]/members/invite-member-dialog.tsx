import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { UserRoundPlus } from "lucide-react"
import { InviteMemberForm } from "./invite-member-form"

export function InviteMemberDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <UserRoundPlus className="mr-2 size-4" />
                    Convidar Membro
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Convidar Membro</DialogTitle>
                    <DialogDescription>Preencha as informações abaixo</DialogDescription>
                </DialogHeader>
                <InviteMemberForm />
            </DialogContent>
        </Dialog>
    )
}