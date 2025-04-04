type Props = {
    children: React.ReactNode
}

export function IconCard({ children }: Props) {
    return (
        <div className="border p-3 rounded-md bg-primary/10 text-primary">
            {children}
        </div>
    )
}