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
                            .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
                        organizationName: z
                            .string({ message: 'Nome da organização é obrigatório' })
                            .trim()
                            .min(3, { message: 'Nome da organização deve ter no mínimo 3 caracteres' }),
                        organizationDomain: z
                            .string({ message: 'Domínio da organização é obrigatório' })
                            .trim()
                            .min(3, { message: 'Domínio da organização deve ter no mínimo 3 caracteres' })
                            .regex(/^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/, { message: 'Domínio da organização inválido' }),
                    })
                }
            },
            async (request, reply) => {
                const { name, email, password, organizationName, organizationDomain } = request.body;

                const newUser = await prisma.user.create({
                    data: {
                        name,
                        email,
                        password: await hash(password, 6),
                    },
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                    }
                })

                const newOrganization = await prisma.organization.create({
                    data: {
                        name: organizationName,
                        domain: organizationDomain,
                        managerId: newUser.id,
                    },
                    select: {
                        id: true,
                        name: true,
                        domain: true,
                        managerId: true,
                        createdAt: true,
                    }
                })

                return reply.send({
                    user: newUser,
                    organization: newOrganization
                });
            }
        )
}