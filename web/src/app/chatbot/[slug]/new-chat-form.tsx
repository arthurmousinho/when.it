'use client'

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { createChatAction } from "./actions"

type Props = {
    slug: string;
}

export function NewChatForm({ slug }: Props) {
    return (
        <form className="w-full" action={() => createChatAction(slug)}>
            <Button className="w-full" variant="outline">
                <Plus size={20} />
                Nova conversa
            </Button>
        </form>
    )
}