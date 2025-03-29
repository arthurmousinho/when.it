import { BaseHeader } from "@/components/base-header";
import { OrganizationsListing } from "./(orgs)/organizations-listing";

export default async function OrganizationsPage() {
    return (
        <div className="w-full">
            <BaseHeader />
            <div className="px-10 pt-4">
                <OrganizationsListing />
            </div>
        </div>
    )
}