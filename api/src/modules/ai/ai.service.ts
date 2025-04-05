import { Injectable } from "@nestjs/common";
import OpenAI from "openai";
import { getChunks } from "src/shared/get-chunks";

type Prompt = {
    question: string;
    organizationName: string;
    chunks: string[];
};

@Injectable()
export class AIService {

    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    public async sendPrompt(prompt: Prompt) {
        const { question, organizationName, chunks } = prompt;

        const finalPrompt = `
            Você é um assistente virtual de uma organização chamada "${organizationName}".
            Somente com base nos trechos de documentos a seguir, responda a pergunta do usuário de forma clara, objetiva e profissional.
            
            ${chunks.join('\n')}
            
            Pergunta: ${question}
            
            Resposta:
        `.trim();

        console.log(finalPrompt);

        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: finalPrompt,
                },
            ],
            temperature: 0.4,
        });

        return response.choices[0].message.content;
    }

    public async generateEmbedding(input: string) {
        const chunks = getChunks(input);
        
        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: chunks.join('\n'),
        });

        if (!response || response.data.length === 0) {
            throw new Error('Falha ao gerar embedding.');
        }

        return {
            chunks: chunks,
            embedding: response.data[0].embedding,
        };
        
    }

}