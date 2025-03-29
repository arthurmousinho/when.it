import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AUTH_TOKEN_KEY } from "@/constants/auth-token-key";

export async function GET(request: NextRequest) {
    (await cookies()).delete(AUTH_TOKEN_KEY);

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/auth/login';

    return NextResponse.redirect(redirectUrl);
}