import React, { useState } from 'react';
import {
  UserPlus,
  RefreshCw,
  Users,
  Calendar,
  ShoppingCart,
  Search
} from 'lucide-react';
import { Header } from '../components/dashboard/Header';
import { Sidebar } from '../components/dashboard/Sidebar';
import { CoachLevels } from '../components/dashboard/CoachLevels';
import { DashboardWidget } from '../components/dashboard/DashboardWidget';

const mockCoachLevels = [
  { club: 'YMA Mansoura', role: 'Coach' },
  { club: 'Al Hawar Club', role: 'Coach' }
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const handleWidgetClick = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        {/* Sidebar with smooth transition */}
        <div className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}>
          <Sidebar />
        </div>

        {/* Main content with smooth transition */}
        <main className={`flex-1 p-6 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'ml-0' : 'ml-0'
        }`}>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Coach Dashboard</h1>
          
          <div className="mb-8">
            <CoachLevels levels={mockCoachLevels} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardWidget
              icon={UserPlus}
              title="Add New Member"
              onClick={() => handleWidgetClick('add_member')}
            />
            <DashboardWidget
              icon={RefreshCw}
              title="Renew Members"
              onClick={() => handleWidgetClick('renew_members')}
            />
            <DashboardWidget
              icon={Users}
              title="Team"
              onClick={() => handleWidgetClick('team')}
            />
            <DashboardWidget
              icon={Calendar}
              title="Events"
              onClick={() => handleWidgetClick('events')}
            />
            <DashboardWidget
              icon={ShoppingCart}
              title="Shopping Cart"
              onClick={() => handleWidgetClick('shopping_cart')}
            />
            <DashboardWidget
              icon={Search}
              title="Member Search"
              onClick={() => handleWidgetClick('member_search')}
            />
          </div>
        </main>
      </div>
    </div>
  );
}