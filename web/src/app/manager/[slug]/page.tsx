'use client'

import { useParams } from "next/navigation";

export default function OrganizationDashboard() {

    const { slug } = useParams();

    return (
        <div>
            <h1>Organization Dashboard</h1>
            <span>Slug: {slug}</span>
        </div>
    )
}