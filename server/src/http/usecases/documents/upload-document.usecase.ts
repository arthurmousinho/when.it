import { streamToBuffer } from "@/helpers/stream-to-buffer";
import { cloudinary } from "@/lib/claudinary";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";

type UploadDocumentParams = {
    file: NodeJS.ReadableStream
}

export async function uploadDocumentUseCase(params: UploadDocumentParams) {
    const { file } = params;

    const buffer = await streamToBuffer(file);

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

    const document = await prisma.document.create({
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

    return { document }
}