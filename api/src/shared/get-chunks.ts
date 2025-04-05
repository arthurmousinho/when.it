export function getChunks(text: string) {
    const overlap = 20;
    const chunkSize = 200 - overlap;

    const chunks: string[] = [];

    for (let i = 0; i < text.length; i += chunkSize) {
        const chunk = text.substring(i, i + chunkSize);
        chunks.push(chunk);
    }

    return chunks;
}