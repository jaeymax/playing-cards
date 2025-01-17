import React from 'react';
import { BarChart, Box, DollarSign, Menu, Bell, ChevronRight } from 'lucide-react';

const MobileDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm">
        <div className="flex justify-between items-center">
          <Menu className="h-6 w-6 text-gray-700" />
          <h1 className="text-lg font-bold">TradeSync</h1>
          <Bell className="h-6 w-6 text-gray-700" />
        </div>
      </header>

      {/* Quick Stats Carousel */}
      <div className="px-4 py-6">
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {[
            { icon: DollarSign, label: 'Revenue', value: '$24,650' },
            { icon: Box, label: 'Products', value: '45' },
            { icon: BarChart, label: 'Growth', value: '+12%' }
          ].map((stat, index) => (
            <div key={index} className="flex-shrink-0 bg-white p-4 rounded-xl shadow-sm w-40">
              <stat.icon className="h-6 w-6 text-blue-600 mb-2" />
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'New Order', color: 'bg-blue-100' },
            { label: 'Add Product', color: 'bg-green-100' },
            { label: 'Get Funding', color: 'bg-purple-100' },
            { label: 'Find Partners', color: 'bg-orange-100' }
          ].map((action, index) => (
            <button key={index} className={`${action.color} p-4 rounded-xl text-sm font-medium`}>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Menu */}
      <div className="bg-white px-4 py-2 flex-grow">
        {[
          'Inventory',
          'Orders',
          'Finances',
          'Partners',
          'Analytics',
          'Settings'
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between py-4 border-b">
            <span className="text-gray-700">{item}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t px-6 py-2">
        <div className="flex justify-between items-center">
          {['Home', 'Orders', 'Products', 'Profile'].map((item, index) => (
            <button key={index} className="p-2 text-sm text-gray-600">
              {item}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileDashboard;
