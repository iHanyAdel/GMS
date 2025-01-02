import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, ClipboardList, FileText, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function Sidebar() {
  const { profile, loading, error } = useAuth();

  if (loading) {
    return (
      <aside className="bg-gray-800 text-white w-64 min-h-screen">
        <div className="p-6 border-b border-gray-700">
          <div className="animate-pulse flex items-center space-x-3">
            <div className="rounded-full bg-gray-700 h-10 w-10"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-20"></div>
              <div className="h-3 bg-gray-700 rounded w-16"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="bg-gray-800 text-white w-64 min-h-screen">
        <div className="p-6 text-red-400">
          Failed to load profile
        </div>
      </aside>
    );
  }

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <User className="h-10 w-10 text-gray-300" />
          <div>
            <h2 className="font-medium">{profile?.full_name || 'User'}</h2>
            <p className="text-sm text-gray-400">{profile?.gms_id || 'Loading...'}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6">
        <NavLink
          to="/dashboard/clubs"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <ClipboardList className="h-5 w-5 mr-3" />
          My Clubs
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <User className="h-5 w-5 mr-3" />
          My Membership Profile
        </NavLink>
        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <FileText className="h-5 w-5 mr-3" />
          My Documents
        </NavLink>
        <NavLink
          to="/dashboard/events"
          className={({ isActive }) =>
            `flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
              isActive ? 'bg-gray-700 text-white' : ''
            }`
          }
        >
          <Calendar className="h-5 w-5 mr-3" />
          Events
        </NavLink>
      </nav>
    </aside>
  );
}