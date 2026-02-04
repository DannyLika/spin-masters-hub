/**
 * Normalize Beyblade names for consistent matching
 * This matches the database function normalize_beyblade_name
 */
export function normalizeBeybladeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[‐‑–—−]/g, '-') // Replace all dash variants with regular hyphen
    .replace(/\s+/g, ' '); // Normalize whitespace
}

/**
 * Get all Beyblades from catalog for validation
 */
export async function getAllBeyblades() {
  const { supabase } = await import('./supabaseClient');
  const { data, error } = await supabase
    .from('beyblades')
    .select('id, name, normalized_name, type')
    .order('name');
  
  if (error) {
    console.error('Failed to load Beyblades:', error);
    return [];
  }
  
  return data ?? [];
}
