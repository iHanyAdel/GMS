import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/dashboard/Sidebar';
import { ProfileLayout } from '../components/profile/ProfileLayout';

export default function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

        <main className="flex-1 py-6 transition-all duration-300 ease-in-out">
          <ProfileLayout profile={profile} />
        </main>
      </div>
    </div>
  );
}