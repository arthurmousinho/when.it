import { ConflitError } from "@/http/_errors/conflit.error";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

type SignUpUserParams = {
    name: string;
    email: string;
    password: string;
}

export async function signUpUserUseCase(params: SignUpUserParams) {
    const { name, email, password } = params;

    const emailAlreadyInUse = await prisma.user.findUnique({
        where: { email }
    });

    if (emailAlreadyInUse) {
        throw new ConflitError('Este e-mail já está em uso');
    }

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: await hash(password, 6),
        }
    })

    return { user }

}