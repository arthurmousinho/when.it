export function generateSlug(organizationName: string): string {
    return organizationName
        .toLowerCase()
        .normalize("NFD") // separate accents from letters
        .replace(/[\u0300-\u036f]/g, "") // remove accents
        .replace(/[^a-z0-9\s.-]/g, "") // remove special characters (keep space, dot, dash)
        .replace(/[\s.]+/g, "-") // replace spaces and dots with dashes
        .replace(/-+/g, "-") // replace multiple dashes with a single one
        .replace(/^-|-$/g, ""); // trim leading/trailing dashes
}