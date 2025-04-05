import { BaseHeader } from "@/components/base-header";
import { OrganizationsListing } from "./(orgs)/organizations-listing";

export default function OrganizationsPage() {
    return (
        <div className="w-full bg-slate-50">
            <BaseHeader />
            <div className="px-10 pt-4">
                <OrganizationsListing />
            </div>
        </div>
    )
}