import { cloudinary } from "@/lib/claudinary";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import type { FastifyInstance } from "fastify";

const streamToBuffer = async (stream: NodeJS.ReadableStream): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
};

export function uploadDocumentRoute(app: FastifyInstance) {
    app.post('/upload', async (request, reply) => {
        const data = await request.file();

        if (!data) {
            return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
        }

        const buffer = await streamToBuffer(data.file);

        const fileId = randomUUID();

        const uploadResult = await new Promise<{ secure_url: string }>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto', folder: 'documents', public_id: fileId },
                (error, result) => {
                    if (error || !result) {
                        return reject(error || new Error('Erro desconhecido no upload'));
                    }
                    resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        const newDocument = await prisma.document.create({
            data: {
                id: randomUUID(),
                name: '',
                description: '',
                status: 'UPLOADED',
                fileId,
                fileUrl: uploadResult.secure_url,
                fileSize: buffer.length,
                fileType: 'PDF',
                uploadedAt: new Date(),
                organizationId: '1',
            }
        })

        return reply.send({ document: newDocument });
    });

}