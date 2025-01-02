import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Club } from '../types/database';

export function useClubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const { data, error } = await supabase
          .from('clubs')
          .select('id, name, province_id')
          .order('name');

        if (error) throw error;
        setClubs(data || []);
      } catch (err) {
        console.error('Error fetching clubs:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch clubs');
      } finally {
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  return { clubs, loading, error };
}