import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { fastifyJwt } from "@fastify/jwt";

import { env } from '@/config/env';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { uploadDocumentRoute } from './routes/document.route';
import { loginUserRoute, signUpUserRoute } from './routes/auth.route';
import { errorHandler } from './error-handler';

export const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

app.register(fastifyMultipart);
app.register(fastifyJwt, {
    secret: env.JWT_SECRET
});

// User routes
app.register(signUpUserRoute);
app.register(loginUserRoute);

// Document routes
app.register(uploadDocumentRoute);


app.listen({ port: Number(env.PORT) }).then(() => {
    console.log('Server listening at http://localhost:3333');
})