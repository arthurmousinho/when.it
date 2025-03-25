export function generateSlug(name: string) {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    return slug;
}