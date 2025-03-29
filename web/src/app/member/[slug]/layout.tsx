import { BaseHeader } from "@/components/base-header"

type Props = {
    children: React.ReactNode
}

export default function MemberLayout({ children }: Props) {
    return (
        <div className="w-full">
            <BaseHeader />
            <div className="">
                {children}
            </div>
        </div>
    )
}