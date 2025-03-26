import type { FastifyInstance } from "fastify"
import { ZodError } from "zod";
import { HTTPError } from "./_errors/error";

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {

    console.log(error instanceof HTTPError)

    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Error de validação',
            errors: error.flatten().fieldErrors
        });
    }

    if (error instanceof HTTPError) {
        return reply.status(error.statusCode).send({
            message: error.message
        });
    }

    console.log(error);

    return reply.status(500).send({ message: 'Internal server error.' });

}