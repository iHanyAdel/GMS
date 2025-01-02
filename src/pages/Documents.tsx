import React from 'react';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/dashboard/Sidebar';
import { DocumentsList } from '../components/documents/DocumentsList';
import { useAuth } from '../hooks/useAuth';

export default function Documents() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { profile, loading } = useAuth();

  if (loading || !profile) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <div className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}>
          <Sidebar />
        </div>

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Documents</h1>
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  Name: {profile.full_name}
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  ID: {profile.gms_id}
                </p>
                <DocumentsList />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}