import React from 'react';
import { Link } from 'react-router-dom';

interface ConsentCheckboxesProps {
  consents: {
    termsAndPolicy: boolean;
    dataCollection: boolean;
    newsletter: boolean;
  };
  onChange: (key: keyof typeof consents, value: boolean) => void;
}

export function ConsentCheckboxes({ consents, onChange }: ConsentCheckboxesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={consents.termsAndPolicy}
            onChange={(e) => onChange('termsAndPolicy', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
        </div>
        <div className="ml-3">
          <label htmlFor="terms" className="text-sm text-gray-600">
            I agree to the{' '}
            <Link to="#" className="text-blue-600 hover:text-blue-500">
              terms of service
            </Link>{' '}
            and{' '}
            <Link to="#" className="text-blue-600 hover:text-blue-500">
              data policy
            </Link>
          </label>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="dataCollection"
            type="checkbox"
            checked={consents.dataCollection}
            onChange={(e) => onChange('dataCollection', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
        </div>
        <div className="ml-3">
          <label htmlFor="dataCollection" className="text-sm text-gray-600">
            I consent to the collection and processing of my personal data
          </label>
        </div>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="newsletter"
            type="checkbox"
            checked={consents.newsletter}
            onChange={(e) => onChange('newsletter', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="newsletter" className="text-sm text-gray-600">
            Subscribe to our newsletter for updates and news (optional)
          </label>
        </div>
      </div>
    </div>
  );
}