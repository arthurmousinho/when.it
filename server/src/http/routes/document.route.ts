import type { FastifyInstance } from "fastify";
import { uploadDocumentUseCase } from "../usecases/documents/upload-document.usecase";

export async function uploadDocumentRoute(app: FastifyInstance) {
    app.post('/documents/upload', async (request, reply) => {
        const data = await request.file();

        if (!data) {
            return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
        }

        const { document } = await uploadDocumentUseCase({ file: data.file });
        return reply.send({ document });
    });
}