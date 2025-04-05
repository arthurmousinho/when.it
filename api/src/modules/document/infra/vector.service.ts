import { Injectable } from '@nestjs/common';
import { Pinecone } from '@pinecone-database/pinecone';

type VectorMetadata = {
    name: string;
    organizationId: string;
    description: string;
    chunks: string[];
}

export type Vector = {
    id: string;
    values: number[];
    metadata: VectorMetadata;
}

type VectorQuery = {
    vector: number[];
    organizationId: string;
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

    public async query(data: VectorQuery) {
        const { vector, organizationId } = data;

        const index = this.pinecone
            .index(this.indexName, this.indexHost)
            .namespace("default");

        const { matches } = await index.query({
            vector,
            topK: 10,
            includeMetadata: true,
            includeValues: false,
            filter: {
                organizationId: {
                    $eq: organizationId,
                },
            },
        });

        return matches
    }

}