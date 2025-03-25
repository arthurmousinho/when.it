import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from 'bcrypt';

import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export function signUpUserRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/auth/signup',
            {
                schema: {
                    body: z.object({
                        name: z
                            .string({ message: 'Nome é obrigatório' })
                            .trim(),
                        email: z
                            .string({ message: 'Email é obrigatório' })
                            .email({ message: 'Email inválido' }),
                        password: z
                            .string({ message: 'Senha é obrigatória' })
                            .trim()
                    })
                }
            },
            async (request, reply) => {
                const { name, email, password } = request.body;

                const emailAlreadyInUse = await prisma.user.findUnique({
                    where: { email }
                });

                if (emailAlreadyInUse) {
                    return reply.status(409).send({
                        message: 'Email já cadastrado',
                    });
                }

                const user = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: await hash(password, 6),
                    }
                })

                return reply.send({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }
                });
            }
        )
}