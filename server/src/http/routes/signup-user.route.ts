import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { hash } from 'bcrypt';

import type { FastifyInstance } from "fastify";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { generateSlug } from "@/helpers/generate-slug";

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
                    })
                }
            },
            async (request, reply) => {
                const { name, email, password, organizationName } = request.body;

                const [user, organization] = await prisma.$transaction([
                    prisma.user.create({
                        data: {
                            name,
                            email,
                            password: await hash(password, 6),
                        }
                    }),
                    prisma.organization.create({
                        data: {
                            name: organizationName,
                            slug: generateSlug(organizationName)
                        }
                    })
                ])

                const manager = await prisma.member.create({
                    data: {
                        userId: user.id,
                        organizationId: organization.id,
                        role: 'MANAGER'
                    }
                })
                
                await prisma.organization.update({
                    where: {
                        id: organization.id
                    },
                    data: {
                        members: {
                            connect: {
                                id: manager.id
                            }
                        }
                    }
                })

                return reply.send({
                    member: {
                        id: manager.id,
                        role: manager.role,
                        organization: {
                            id: organization.id,
                            name: organization.name,
                            slug: organization.slug
                        },
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        }
                    }
                });
            }
        )
}