import { UnauthorizedError } from "@/http/_errors/unauthorized.error";
import { app } from "@/http/server";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

type LoginUserParams = {
    email: string;
    password: string;
}

export async function loginUserUseCase(params: LoginUserParams) {

    const { email, password } = params;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!user) {
        throw new UnauthorizedError('Credenciais inválidas');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
        throw new UnauthorizedError('Credenciais inválidas');
    }

    const token = app.jwt.sign(
        {
            name: user.name,
            email: user.email
        },
        {
            sub: user.id,
            expiresIn: '1d'
        }
    );

    return { token }

}