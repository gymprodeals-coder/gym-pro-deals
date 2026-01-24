/**
 * Resolves the category image path from a category string.
 */
export function getCategoryImage(category: string | undefined): string {
    const cat = (category || "").toLowerCase();

    // Explicit mapping to local SVGs
    if (cat.includes("whey")) return "/images/categories/whey-protein.svg";
    if (cat.includes("creatine")) return "/images/categories/creatine.svg";
    if (cat.includes("pre")) return "/images/categories/pre-workout.svg";
    if (cat.includes("bcaa")) return "/images/categories/bcaa.svg";
    if (cat.includes("vitamin")) return "/images/categories/vitamins.svg";
    if (cat.includes("gainer")) return "/images/categories/mass-gainer.svg";

    // Fallback
    return "/images/categories/supplements.svg";
}
