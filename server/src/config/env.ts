import dotenv from 'dotenv';
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.string(),
    CLOUDINARY_CLOUD_NAME: z.string(),
    CLOUDINARY_API_KEY: z.string(),
    CLOUDINARY_API_SECRET: z.string(),
    PINECONE_API_KEY: z.string(),
    OPENAI_API_KEY: z.string(),
    DATABASE_URL: z.string().url(),
})

export const env = envSchema.parse(process.env);