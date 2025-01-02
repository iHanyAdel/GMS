import { supabase } from '../lib/supabase';

export async function checkUniqueField(field: string, value: string): Promise<boolean> {
  const { count, error } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .eq(field, value);

  if (error) {
    console.error(`Error checking ${field}:`, error);
    return false;
  }

  return count === 0;
}