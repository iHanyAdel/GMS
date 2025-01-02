import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';

export function useSearch() {
  const [results, setResults] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMembers = useCallback(async (query: string, clubId: string) => {
    if (!query.trim() || !clubId) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('club_id', clubId)
        .eq('role', 'athlete')
        .or(`full_name.ilike.%${query}%,gms_id.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, searchMembers };
}