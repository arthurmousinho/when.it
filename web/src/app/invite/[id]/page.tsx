import Image from 'next/image';
import logo from "@/assets/brand/horizontal-logo.svg";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Check, LogOut, UserRound, X } from 'lucide-react';
import { getInvite } from '@/http/invite/get-invite.http';
import { getInitials } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { auth, isAuthenticated } from '@/app/auth/(auth)/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { acceptInvite } from '@/http/invite/accept-invite.http';
import { Suspense } from 'react';

type Props = {
    params: {
        id: string;
    }
}

export default async function InvitePage({ params: { id } }: Props) {

    const { invite } = await getInvite(id);

    const isUserAuthenticated = await isAuthenticated();

    let currentUser: {
        id: string;
        name: string;
        email: string;
    } | null = null;

    if (isUserAuthenticated) {
        const { user } = await auth();
        currentUser = user;
    }

    const isUserAuthenticatedWithInviteEmail = currentUser?.email === invite.email;

    async function loginFromInviteAction() {
        'use server'

        const inviteId = invite.id;
        const inviteEmail = invite.email;

        (await cookies()).set('inviteId', inviteId)
        redirect(`/auth/login?email=${inviteEmail}`)
    }

    async function acceptInviteAction() {
        'use server'

        await acceptInvite(invite.id);
        redirect('/orgs');
    }

    return (
        <div className="flex flex-col gap-10 justify-center items-center h-dvh w-full">
            <Image
                src={logo}
                alt="When.it"
                width={200}
                height={100}
            />
            {invite.status !== 'PENDING' ? (
                <Alert variant="destructive" className='max-w-md'>
                    <AlertTriangle />
                    <AlertTitle>
                        Convite expirado
                    </AlertTitle>
                    <AlertDescription>
                        Este convite foi {invite.status === 'ACCEPTED' ? 'aceito' : 'rejeitado'}!
                    </AlertDescription>
                </Alert>
            ) : (
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-2 justfy-center">
                        <Avatar className="size-16">
                            <AvatarFallback>
                                {getInitials(invite.author.name)}
                            </AvatarFallback>
                        </Avatar>
                        <p className=" leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground">
                                {invite.author?.name ?? 'Someone'}
                            </span>{' '}
                            convidou você para participar da organização{' '}
                            <span className="font-medium text-foreground">
                                {invite.organization.name}
                            </span>
                            .{' '}
                        </p>
                    </CardHeader>
                    <CardFooter className="flex gap-2">
                        {!isUserAuthenticated && (
                            <form action={loginFromInviteAction} className="w-full">
                                <Button className="w-full" type="submit">
                                    <UserRound size={18} />
                                    Fazer login para aceitar/recusar o convite
                                </Button>
                            </form>
                        )}
                        {isUserAuthenticatedWithInviteEmail && (
                            <>
                                <form action={acceptInviteAction} className="w-full">
                                    <Button className="w-full" type="submit">
                                        <Check size={18} />
                                        Aceitar convite
                                    </Button>
                                </form>
                            </>
                        )}
                        {isUserAuthenticated && !isUserAuthenticatedWithInviteEmail && (
                            <div className="space-y-4">
                                <p className="text-balance text-left text-sm leading-relaxed text-muted-foreground">
                                    O convite foi enviado para {' '}
                                    <span className="font-medium text-foreground">
                                        {invite.email},
                                    </span>{' '}
                                    mas você está logado como{' '}
                                    <span className="font-medium text-foreground">
                                        {currentUser?.email}
                                    </span>
                                    .
                                </p>
                                <Button className="w-full" variant="secondary" asChild>
                                    <a href="/auth/signout">
                                        <LogOut className="mr-2 size-4" />
                                        Sair da conta {currentUser?.email}
                                    </a>
                                </Button>
                            </div>
                        )}
                    </CardFooter>
                </Card>
            )}
        </div>
    )
}