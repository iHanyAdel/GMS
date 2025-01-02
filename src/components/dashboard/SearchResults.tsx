import React from 'react';
import { Link } from 'react-router-dom';
import type { Profile } from '../../types/database';

interface SearchResultsProps {
  results: Profile[];
  onClose: () => void;
}

export function SearchResults({ results, onClose }: SearchResultsProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-96 overflow-auto z-50">
      <ul className="py-2">
        {results.map((result) => (
          <li key={result.id}>
            <Link
              to={`/profile/${result.id}`}
              className="flex items-center px-4 py-2 hover:bg-gray-100"
              onClick={onClose}
            >
              <div>
                <p className="font-medium text-gray-900">{result.full_name}</p>
                <p className="text-sm text-gray-500">{result.gms_id}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}