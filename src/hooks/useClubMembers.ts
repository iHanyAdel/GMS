import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Profile } from '../types/database';

export function useClubMembers(clubId: string) {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      if (!clubId) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('club_id', clubId)
          .eq('role', 'athlete');

        if (error) throw error;
        setMembers(data || []);
      } catch (err) {
        console.error('Error fetching club members:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch members');
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [clubId]);

  return { members, loading, error };
}