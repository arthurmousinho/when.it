import Image from 'next/image';
import logo from "@/assets/brand/horizontal-logo.svg";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { getInvite } from '@/http/invite/get-invite.http';
import { getInitials } from '@/lib/utils';

type Props = {
    params: {
        id: string;
    }
}

export default async function InvitePage({ params: { id } }: Props) {

    const { invite } = await getInvite(id);

    return (
        <div className="flex flex-col gap-10 justify-center items-center h-dvh w-full">
            <Image
                src={logo}
                alt="When.it"
                width={200}
                height={100}
            />
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex flex-row items-center gap-2">
                    <Avatar className="size-12">
                        <AvatarFallback className="text-xl font-medium">
                            {getInitials(invite.author.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1">
                        <CardTitle>
                            {invite.author.name}
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">
                            {invite.organization.name}
                        </p>
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription className='text-base'>
                        Você foi convidado para participar da organização <span className="font-bold">{invite.organization.name}</span>
                    </CardDescription>
                </CardContent>
                <CardFooter className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <X size={18} />
                        Recusar
                    </Button>
                    <Button className="gap-2 flex-1">
                        <Check size={18} />
                        Aceitar Convite
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}