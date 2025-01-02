import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { useSignIn } from '../hooks/useSignIn';

export default function SignIn() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, loading, error } = useSignIn();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPassword(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(identifier, password);
  };

  return (
    <Layout title="Login">
      <form className="space-y-6" onSubmit={showPassword ? handleSubmit : handleNext}>
        <div>
          <div className="mt-1">
            <input
              id="identifier"
              name="identifier"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter email or Member ID"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              disabled={showPassword}
            />
          </div>
        </div>

        {showPassword && (
          <div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (showPassword ? 'Login' : 'Next')}
          </button>
        </div>

        {!showPassword && (
          <>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR FIND YOUR ACCOUNT</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="text-sm text-gray-600">Forgot </span>
                <Link to="/reset-password" className="text-sm text-blue-500 hover:text-blue-400">
                  password
                </Link>
                <span className="text-sm text-gray-600"> or </span>
                <Link to="/reset-password" className="text-sm text-blue-500 hover:text-blue-400">
                  login
                </Link>
                <span className="text-sm text-gray-600">?</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/signup"
                className="text-sm text-blue-500 hover:text-blue-400"
              >
                Create an account
              </Link>
            </div>
          </>
        )}
      </form>
    </Layout>
  );
}