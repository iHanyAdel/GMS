import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: 'Summary', path: '/profile' },
  { name: 'Membership', path: '/profile/membership' },
  { name: 'Events', path: '/profile/events' },
  { name: 'My Courses', path: '/profile/courses' },
  { name: 'My Certificates', path: '/profile/certificates' },
  { name: 'Event Results', path: '/profile/results' },
  { name: 'Member Dashboard', path: '/dashboard' },
];

export function ProfileNavigation() {
  const location = useLocation();

  return (
    <div className="w-full overflow-x-auto pb-2">
      <nav className="flex flex-wrap gap-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-4 py-2 rounded-md whitespace-nowrap ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}