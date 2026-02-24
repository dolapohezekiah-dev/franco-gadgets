import { createClient } from "@supabase/supabase-js";

// These values come from your .env file
// NEVER hardcode real keys here — always use environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "⚠️ Supabase keys not found. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file."
  );
}

export const supabase = createClient(
  SUPABASE_URL || "https://placeholder.supabase.co",
  SUPABASE_ANON_KEY || "placeholder"
);

// ─── PRODUCTS ────────────────────────────────────────────────

/** Fetch all products from Supabase, ordered by id */
export async function fetchProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;

  // Parse JSON fields that Supabase stores as text
  return data.map(parseProduct);
}

/** Insert a brand new product */
export async function insertProduct(product) {
  const { data, error } = await supabase
    .from("products")
    .insert([serializeProduct(product)])
    .select()
    .single();

  if (error) throw error;
  return parseProduct(data);
}

/** Update an existing product by id */
export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("products")
    .update(serializeProduct(product))
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return parseProduct(data);
}

/** Delete a product by id */
export async function deleteProduct(id) {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/** Seed Supabase with the default products from products.js */
export async function seedProducts(products) {
  // First clear existing rows
  await supabase.from("products").delete().neq("id", 0);
  const { data, error } = await supabase
    .from("products")
    .insert(products.map(serializeProduct))
    .select();

  if (error) throw error;
  return data.map(parseProduct);
}

// ─── SETTINGS ────────────────────────────────────────────────

/** Fetch store settings (single row, id = 1) */
export async function fetchSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows
  return data;
}

/** Save store settings (upsert = insert or update) */
export async function saveSettings(settings) {
  const { data, error } = await supabase
    .from("settings")
    .upsert({ id: 1, ...settings })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ─── HELPERS ─────────────────────────────────────────────────

/**
 * Supabase stores arrays and objects as JSON strings.
 * Before saving, convert images[], specs{}, variants[] to strings.
 */
function serializeProduct(p) {
  return {
    ...p,
    images: typeof p.images === "string" ? p.images : JSON.stringify(p.images || []),
    specs: typeof p.specs === "string" ? p.specs : JSON.stringify(p.specs || {}),
    variants: typeof p.variants === "string" ? p.variants : JSON.stringify(p.variants || []),
  };
}

/**
 * After fetching from Supabase, parse JSON strings back to arrays/objects.
 */
function parseProduct(p) {
  return {
    ...p,
    images: typeof p.images === "string" ? JSON.parse(p.images || "[]") : (p.images || []),
    specs: typeof p.specs === "string" ? JSON.parse(p.specs || "{}") : (p.specs || {}),
    variants: typeof p.variants === "string" ? JSON.parse(p.variants || "[]") : (p.variants || []),
  };
}
