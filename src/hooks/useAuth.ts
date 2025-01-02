import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { initializeAuth } from '../lib/auth';
import type { User } from '@supabase/supabase-js';
import type { Profile } from '../types/database';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchProfile(userId: string) {
    try {
      const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;

      if (profiles && profiles.length > 0) {
        setProfile(profiles[0]);
      } else {
        // Create new profile if none exists
        const { data: userData } = await supabase.auth.getUser();
        if (userData?.user) {
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert([
              {
                user_id: userId,
                full_name: userData.user.user_metadata.full_name,
                role: userData.user.user_metadata.role,
              }
            ])
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
        }
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;

    async function initialize() {
      try {
        const { session } = await initializeAuth();
        
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        if (mounted) {
          setError('Failed to initialize authentication');
          setLoading(false);
        }
      }
    }

    initialize();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, profile, loading, error };
}