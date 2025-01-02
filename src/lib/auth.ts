import { supabase } from './supabase';
import type { Profile } from '../types/database';

export async function signInWithIdentifier(identifier: string, password: string) {
  try {
    // Try email sign in first
    const { data: emailSignIn, error: emailError } = await supabase.auth.signInWithPassword({
      email: identifier,
      password,
    });

    if (emailSignIn.user) {
      return { user: emailSignIn.user, error: null };
    }

    // If email sign in fails, try to find user by member_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('member_id', identifier)
      .single();

    if (profileError || !profile) {
      return { user: null, error: 'Invalid credentials' };
    }

    // Get user's email using their user_id
    const { data: userData } = await supabase
      .from('auth.users')
      .select('email')
      .eq('id', profile.user_id)
      .single();

    if (!userData?.email) {
      return { user: null, error: 'User not found' };
    }

    // Sign in with the found email
    const { data: finalSignIn, error: finalError } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password,
    });

    if (finalError) {
      console.error('Sign in error:', finalError);
    }

    return {
      user: finalSignIn?.user ?? null,
      error: finalError?.message ?? null,
    };
  } catch (err) {
    console.error('Authentication error:', err);
    return { user: null, error: 'An unexpected error occurred' };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('Sign out error:', err);
    return { error: 'Failed to sign out' };
  }
}

// Handle auth state persistence
export async function initializeAuth() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Clear any stale auth state
      await supabase.auth.signOut();
    }
    return { session, error: null };
  } catch (err) {
    console.error('Auth initialization error:', err);
    return { session: null, error: 'Failed to initialize auth' };
  }
}