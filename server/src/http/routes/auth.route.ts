import { z } from "zod";

import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { loginUserUseCase } from "../usecases/auth/login-user.usecase";
import { signUpUserUseCase } from "../usecases/auth/signup-user.usecase";

export async function loginUserRoute(app: FastifyInstance) {
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
                const { token } = await loginUserUseCase(request.body);
                return reply.status(200).send({ token });
            }
        )
}

export async function signUpUserRoute(app: FastifyInstance) {
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
                const { user } = await signUpUserUseCase(request.body)
                return reply.send({
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt
                    }
                });
            }
        )
}