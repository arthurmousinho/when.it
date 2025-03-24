import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config();

export const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
});