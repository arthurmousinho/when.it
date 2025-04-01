import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import * as pdf from 'pdf-parse';
import { StorageService } from './storage.service';

@Injectable()
export class EmbeddingService {

    private openai: OpenAI;

    constructor(
        private readonly storageService: StorageService
    ) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    public async generateEmbedding(fileUrl: string): Promise<number[]> {
        const fileBuffer = await this.storageService.getFileBuffer(fileUrl);
        const fileContent = await pdf(fileBuffer);

        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: fileContent.text,
        });

        if (!response || response.data.length === 0) {
            throw new Error('Falha ao gerar embedding.');
        }

        return response.data[0].embedding;
    }

}