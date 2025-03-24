import Fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import { uploadDocumentRoute } from './routes/upload-document-route';

export const app = Fastify({
    logger: true
})

app.register(fastifyMultipart);

app.get('/', async function handler(request, reply) {
    return { hello: 'world' }
});

app.register(uploadDocumentRoute);

try {
    app.listen({ port: 3333 }).then(() => {
        console.log('Server listening at http://localhost:3333');
    })
} catch (err) {
    console.error(err);
    process.exit(1);
}