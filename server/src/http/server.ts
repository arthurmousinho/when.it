import Fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';
import { env } from '@/config/env';
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { uploadDocumentRoute } from './routes/upload-document-route';
import { signUpUserRoute } from './routes/signup-user.route';

export const app = Fastify({ logger: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyMultipart);

app.register(signUpUserRoute);
app.register(uploadDocumentRoute);

try {
    app.listen({ port: Number(env.PORT) }).then(() => {
        console.log('Server listening at http://localhost:3333');
    })
} catch (err) {
    console.error(err);
    process.exit(1);
}