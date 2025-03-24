import { cloudinary } from '../lib/claudinary';
import type { FastifyInstance } from 'fastify';

const streamToBuffer = async (stream: NodeJS.ReadableStream): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};

export function uploadDocumentRoute(app: FastifyInstance) {
    app.post('/upload', async (request, reply) => {
        try {
            const data = await request.file();

            if (!data) {
                return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
            }

            const buffer = await streamToBuffer(data.file);

            const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: 'auto', folder: 'documents' },
                    (error, result) => {
                        if (error || !result) {
                            return reject(error || new Error('Erro desconhecido no upload'));
                        }
                        resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            return reply.send({ url: uploadResult.secure_url });

        } catch (error) {
            console.error('Erro no upload:', error);
            return reply.status(500).send({ error: 'Falha no upload' });
        }
    });
}
