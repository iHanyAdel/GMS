import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, MessageSquare, ChevronDown, Trophy, Menu } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { SearchResults } from './SearchResults';
import { useAuth } from '../../hooks/useAuth';
import { useSearch } from '../../hooks/useSearch';
import { useClubs } from '../../hooks/useClubs';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const { profile } = useAuth();
  const { clubs, loading: clubsLoading } = useClubs();
  const { results, loading: searchLoading, searchMembers } = useSearch();
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const firstName = profile?.full_name?.split(' ')[0] || '';
  const gmsId = profile?.gms_id || '';
  const clubId = profile?.club_id || '';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    searchMembers(query, clubId);
    setShowResults(true);
  };

  const getCurrentClub = () => {
    if (clubsLoading) return 'Loading...';
    const club = clubs.find(c => c.club_id === clubId);
    return club?.club_name || 'No Club Selected';
  };

  return (
    <header className="bg-white shadow-sm px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Trophy className="h-8 w-8 text-blue-500" />
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 whitespace-nowrap hidden md:block">
            Hey, <span className="font-medium">{firstName}</span>{' '}
            <span className="text-gray-400">({gmsId})</span>
          </Link>

          <div className="relative hidden md:block" ref={searchRef}>
            <input
              type="text"
              placeholder="Search athletes by name or GMS ID"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            {showResults && (
              <SearchResults 
                results={results} 
                onClose={() => setShowResults(false)} 
              />
            )}
          </div>

          <select 
            className="border border-gray-200 rounded-md py-2 px-3 text-gray-600 focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={clubId}
            disabled
          >
            <option value={clubId}>{getCurrentClub()}</option>
          </select>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <MessageSquare className="h-6 w-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
            </button>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}