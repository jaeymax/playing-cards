import React, { useState } from 'react';

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'challenge',
      read: false,
      title: 'Challenge Received',
      message: 'Player TitanSlayer99 has challenged you to a duel!',
      time: '2 minutes ago',
      action: 'Accept Challenge'
    },
    {
      id: 2,
      type: 'friend',
      read: false,
      title: 'Friend Request',
      message: 'NeonKnight42 wants to add you as a friend',
      time: '15 minutes ago',
      action: 'Accept Request'
    },
    {
      id: 3,
      type: 'reward',
      read: false,
      title: 'Daily Reward',
      message: 'You\'ve earned 5 premium card packs! Claim them now.',
      time: '1 hour ago',
      action: 'Claim Reward'
    },
    {
      id: 4,
      type: 'tournament',
      read: true,
      title: 'Tournament Registration',
      message: 'The Cosmic Showdown tournament starts in 24 hours. Complete your deck registration.',
      time: '3 hours ago',
      action: 'Register Now'
    },
    {
      id: 5,
      type: 'system',
      read: true,
      title: 'System Update',
      message: 'New cards and balance changes have been added to the game.',
      time: '1 day ago',
      action: 'View Details'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const getFilteredNotifications = () => {
    if (activeTab === 'all') return notifications;
    if (activeTab === 'unread') return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === activeTab);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'challenge':
        return '⚔️';
      case 'friend':
        return '👤';
      case 'reward':
        return '🎁';
      case 'tournament':
        return '🏆';
      case 'system':
        return '⚙️';
      default:
        return '📩';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'challenge':
        return 'bg-blue-600';
      case 'friend':
        return 'bg-green-500';
      case 'reward':
        return 'bg-yellow-500';
      case 'tournament':
        return 'bg-purple-600';
      case 'system':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-700 to-blue-500 border-b border-blue-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">NEXUS CARDS</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 text-white hover:text-blue-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </div>
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-white font-bold border-2 border-blue-300">
                  JP
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          {/* Notifications Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notifications
              <span className="ml-2 text-sm bg-blue-600 text-white px-2 py-1 rounded-full">{notifications.length}</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="bg-gray-900 border-b border-gray-700">
            <div className="flex overflow-x-auto scrollbar-none">
              <button 
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'all' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'unread' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('unread')}
              >
                Unread
                {unreadCount > 0 && (
                  <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">{unreadCount}</span>
                )}
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'challenge' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('challenge')}
              >
                Challenges
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'tournament' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('tournament')}
              >
                Tournaments
              </button>
              <button 
                className={`px-6 py-3 font-medium text-sm focus:outline-none transition ${activeTab === 'reward' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-white'}`}
                onClick={() => setActiveTab('reward')}
              >
                Rewards
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="divide-y divide-gray-700">
            {getFilteredNotifications().length > 0 ? (
              getFilteredNotifications().map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 transition-colors hover:bg-gray-750 ${notification.read ? 'opacity-80' : 'bg-gray-750'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 h-10 w-10 rounded-md ${getTypeColor(notification.type)} flex items-center justify-center text-xl`}>
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-100">{notification.title}</p>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-300">{notification.message}</p>
                      <div className="mt-2">
                        <button className="px-4 py-1 text-xs font-semibold rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 transition">
                          {notification.action}
                        </button>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="ml-2 flex-shrink-0">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <p className="font-medium">No notifications to display</p>
                <p className="text-sm mt-1">Check back later for updates</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
