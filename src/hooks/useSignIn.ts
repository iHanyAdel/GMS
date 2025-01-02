import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithIdentifier } from '../lib/auth';

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const signIn = async (identifier: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { user, error } = await signInWithIdentifier(identifier, password);
      
      if (error || !user) {
        setError(error || 'Invalid credentials');
        return false;
      }

      navigate('/dashboard');
      return true;
    } catch (err) {
      setError('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading, error };
}