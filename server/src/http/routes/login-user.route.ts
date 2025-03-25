import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { compare } from 'bcrypt';

import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export function loginUserRoute(app: FastifyInstance) {
    app
        .withTypeProvider<ZodTypeProvider>()
        .post(
            '/auth/login',
            {
                schema: {
                    body: z.object({
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
                const { email, password } = request.body;

                const user = await prisma.user.findUnique({
                    where: {
                        email
                    }
                });

                if (!user) {
                    return reply.status(401).send({
                        message: 'Credenciais inválidas'
                    });
                }

                const passwordMatch = await compare(password, user.password);

                if (!passwordMatch) {
                    return reply.status(401).send({
                        message: 'Credenciais inválidas'
                    });
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

                return reply.status(200).send({ token });
            }
        )
}