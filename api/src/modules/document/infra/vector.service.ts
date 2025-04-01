import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

type Vector = {
    id: string;
    values: number[];
    metadata?: Record<string, any>;
}

@Injectable()
export class VectorService {

    private indexName = process.env.PINECONE_INDEX || '';
    private indexHost = process.env.PINECONE_HOST || '';

    private pinecone: Pinecone;

    constructor() {
        this.pinecone = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY || '',
        });
    }

    public async upsert(vectors: Vector[]) {
        const namespace = this.pinecone.index(
            this.indexName,
            this.indexHost
        ).namespace("default");
        return namespace.upsert(vectors);
    }

    public async query(vector: number[]) {
        const index = this.pinecone.index(process.env.PINECONE_INDEX || '');

        const { matches } = await index.query({
            vector,
            topK: 10,
            includeMetadata: true,
            includeValues: false,
        });

        return matches
            .filter((match) => {
                if (!match.score) return false;
                return match.score > 0.8
            })
            .map((match) => parseInt(match.id));
    }
}
