import { Injectable } from "@nestjs/common";
import * as pdf from "pdf-parse";
import OpenAI from "openai";

@Injectable()
export class AIService {

    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    public async sendPrompt(prompt: string) {
        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return response.choices[0].message.content;
    }

    public async generateEmbedding(fileBuffer: Buffer): Promise<number[]> {
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