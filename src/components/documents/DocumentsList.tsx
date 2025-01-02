import React from 'react';
import { DocumentItem } from './DocumentItem';
import { useDocuments } from '../../hooks/useDocuments';

export function DocumentsList() {
  const { documents, loading } = useDocuments();

  if (loading) {
    return <div>Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
        <div className="space-y-4">
          <DocumentItem
            title="National Coach Certification"
            status="approved"
          />
          <DocumentItem
            title="National Black Belt Certification"
            status="approved"
          />
          <DocumentItem
            title="Kukkiwon Certification"
            status="approved"
          />
        </div>
      </section>

      <section>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Optional Documents</h3>
        <div className="space-y-4">
          <DocumentItem
            title="Colour Portrait ID Picture"
            status="approved"
          />
          <DocumentItem
            title="National Color Belt Certification"
            status="pending"
          />
          <DocumentItem
            title="Continental Union Kyorugi Coach Certification"
            status="pending"
          />
          <DocumentItem
            title="Para Taekwondo Classification Form"
            status="rejected"
          />
          <DocumentItem
            title="Passport"
            status="approved"
          />
          <DocumentItem
            title="National Identification"
            status="approved"
          />
        </div>
      </section>
    </div>
  );
}