import slugify from "slugify";

const slugifyOptions = {
  replacement: "-", // Replace spaces with hyphen
  lower: true, // Convert to lowercase
  strict: true, // Strip special characters
  trim: true, // Trim leading/trailing spaces
};

/**
 * Generates a URL-friendly slug from a given string.
 * @param text - The input string to convert to a slug.
 * @returns A URL-friendly slug.
 */
const generateSlug = (text: string): string => slugify(text, slugifyOptions);

export { generateSlug };
