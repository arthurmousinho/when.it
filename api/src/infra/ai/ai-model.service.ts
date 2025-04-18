import { Injectable } from "@nestjs/common";
import { getChunks } from "src/shared/get-chunks";
import OpenAI from "openai";

type Prompt = {
    question: string;
    organizationName: string;
    organizationDescription: string;
    chunks: string[];
};

@Injectable()
export class AIModelService {

    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    public async sendPrompt(prompt: Prompt) {
        const { question, organizationName, chunks, organizationDescription } = prompt;

        const finalPrompt = `
            Você é um assistente virtual de uma organização chamada **${organizationName}**, descrita como:  
            "${organizationDescription}".
            
            Sua função é responder perguntas dos colaboradores com base **exclusivamente** nos trechos de documentos fornecidos abaixo.  
            Responda de forma clara, objetiva e profissional, utilizando somente as informações presentes nesses trechos.
            
            Se os documentos forem inconclusivos ou não tiverem relação com a pergunta, diga ao usuário que não há informações suficientes sobre o assunto. Oriente-o a procurar um responsável da organização para obter esclarecimentos.
            
            A data e hora atual é: ${new Date().toLocaleString()}.
            
            Documentos:
            ${chunks.join('\n')}
            
            Pergunta:
            ${question}
        `.trim();

        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: finalPrompt, }],
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