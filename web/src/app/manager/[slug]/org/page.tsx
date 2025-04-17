import { OrganizationForm } from "@/app/orgs/(orgs)/organization-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrganization } from "@/http/organization/get-organization.http";
import { formatDate } from "@/lib/utils";
import { deleteOrganizationAction } from "./actions";
import { DeleteOrganizationDialog } from "./delete-organization-dialog";

type Props = {
    params: {
        slug: string;
    }
}

export default async function OrganizationPage({ params: { slug } }: Props) {

    const { organization } = await getOrganization(slug)

    function handleDeleteOrganization() {
        deleteOrganizationAction(organization.slug);
    }

    return (
        <div className="space-y-4">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Minha Organização
                    </h2>
                    <p className="text-muted-foreground">
                        Gerencie os dados da sua organização
                    </p>
                </div>
            </header>
            <Card>
                <CardHeader>
                    <header className="flex flex-row items-center justify-between">
                        <div className="space-y-4">
                            <div className="flex flex-row items-center gap-2">
                                <CardTitle>
                                    Dados da Organização
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Última atualização em {formatDate(organization.updatedAt)}
                            </CardDescription>
                        </div>
                        <DeleteOrganizationDialog organizationSlug={organization.slug} />
                    </header>
                </CardHeader>
                <CardContent>
                    <OrganizationForm
                        isUpdating={true}
                        data={{
                            organizationSlug: slug,
                            name: organization.name,
                            description: organization.description
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}