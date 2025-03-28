type Props = {
    params: {
        slug: string;
    }
}

export default function OrganizationDashboard({ params: { slug } }: Props) {
    return (
        <div>
            <h1>Organization Dashboard</h1>
            <span>Slug: {slug}</span>
        </div>
    )
}