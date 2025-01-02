import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Layout } from '../components/Layout';

export default function ResetPassword() {
  const [identifier, setIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // First, try to find user by membership number
      const { data: profileData } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('membership_number', identifier)
        .single();

      // If found by membership number, get the email from auth.users
      if (profileData?.user_id) {
        const { data: userData } = await supabase
          .from('auth.users')
          .select('email')
          .eq('id', profileData.user_id)
          .single();

        if (userData?.email) {
          await supabase.auth.resetPasswordForEmail(userData.email);
        }
      } else {
        // If not found by membership number, try direct email reset
        await supabase.auth.resetPasswordForEmail(identifier);
      }

      setMessage('If an account exists with this email/membership number, you will receive password reset instructions.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Reset Password">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <div className="mt-1">
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email or Membership number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {message && (
          <div className="text-sm text-center text-gray-600">
            {message}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-blue-500 hover:text-blue-400"
        >
          Back to Login
        </button>
      </div>
    </Layout>
  );
}