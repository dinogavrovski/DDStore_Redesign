// FAKE API LAYER
// Every function here returns a Promise, exactly like a real fetch() would.
// Components never import the mock data directly, only these functions.
// When we get the real backend, only this file changes.
import Fuse from "fuse.js";
import { products } from "../data/products.js";
import { normalize } from "../lib/normalize.js";

// Simulates network latency so you can see loading states.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts({ category, onSale, limit } = {}) {
  await delay(300);
  let result = products;
  if (category) result = result.filter((p) => p.category === category);
  if (onSale) result = result.filter((p) => p.oldPrice !== null);
  if (limit) result = result.slice(0, limit);
  return result;
}

export async function getProductBySlug(slug) {
  await delay(200);
  const product = products.find((p) => p.slug === slug);
  if (!product) throw new Error("Производот не е пронајден");
  return product;
}

// ---------- Typo-tolerant search ----------
// Fuse.js does "fuzzy" matching in the browser: "rtx 5o60" or "lapotp" still match.
// Later this becomes a request to a real search engine (Meilisearch/Typesense/Elastic),
// but the function signature stays the same, so components won't notice.
const searchIndex = products.map((p) => ({
  ...p,
  _name: normalize(p.name),
  _brand: normalize(p.brand),
  _tags: p.tags.map(normalize),
}));

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "_name", weight: 0.6 },
    { name: "_tags", weight: 0.3 },
    { name: "_brand", weight: 0.1 },
  ],
  threshold: 0.4, // 0 = exact match only, 1 = match anything. 0.3–0.4 is a good typo range.
  ignoreLocation: true, // match anywhere in the name, not just near the start
  minMatchCharLength: 2,
});

export async function searchProducts(query, { limit } = {}) {
  await delay(150);
  const q = normalize(query);
  if (q.length < 2) return [];
  const results = fuse.search(q).map((r) => r.item);
  return limit ? results.slice(0, limit) : results;
}
