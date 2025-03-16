import React, { useState } from 'react';
import { Users, UserPlus, Search, MoreVertical, Circle, GamepadIcon, Clock, MessageSquare } from 'lucide-react';


const FriendsPage = () => {
  const [filter, setFilter] = useState('all');
  const [friends, setFriends] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      status: 'online',
      activity: 'In Game - Texas Hold\'em',
      lastSeen: 'Now',
      level: 42,
      avatarUrl: 'https://github.com/shadcn.png'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      status: 'away',
      activity: 'Last played 2 hours ago',
      lastSeen: '2 hours ago',
      level: 28,
      avatarUrl: 'https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      status: 'offline',
      activity: 'Last seen yesterday',
      lastSeen: '1 day ago',
      level: 35,
      avatarUrl: 'https://img.freepik.com/free-vector/cute-ninja-gaming-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-flat_138676-8079.jpg?semt=ais_hybrid'
    },
    {
      id: 4,
      name: 'Alex Thompson',
      status: 'online',
      activity: 'In Game - Blackjack',
      lastSeen: 'Now',
      level: 51,
      avatarUrl: 'https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg'
    }
  ]);


  //fetch('https://api.example.com/friends');

  const filterTypes = [
    { label: 'All', value: 'all', icon: Users },
    { label: 'Online', value: 'online', icon: Circle },
    { label: 'In Game', value: 'ingame', icon: GamepadIcon },
    { label: 'Recent', value: 'recent', icon: Clock }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-500';
      case 'away': return 'text-yellow-500';
      case 'offline': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const filteredFriends = friends.filter(friend => {
    if (filter === 'all') return true;
    if (filter === 'online') return friend.status === 'online';
    if (filter === 'ingame') return friend.activity.includes('In Game');
    if (filter === 'recent') return friend.lastSeen.includes('ago');
    return true;
  });

  return (
    <div className="min-h-screen bottom-nav text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Friends
          </h1>
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            <UserPlus className="h-4 w-4" />
            Add Friend
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search friends..."
            className="w-full header text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {filterTypes.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                filter === value 
                  ? 'bg-green-600 text-white' 
                  : 'header text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Friends List */}
        <div className="space-y-4">
          {filteredFriends.map((friend) => (
            <div
              key={friend.id}
              className="p-4 rounded-lg header hover:bg-gray-700 transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full bg-gray-700"
                  />
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    getStatusColor(friend.status)
                  }`} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">
                        {friend.name}
                        <span className="ml-2 text-sm text-gray-400">Lvl {friend.level}</span>
                      </h3>
                      <p className="text-sm text-gray-400">{friend.activity}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                        <GamepadIcon className="h-4 w-4 text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFriends.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400">No friends found</h3>
            <p className="text-gray-500">Try adjusting your filters or add new friends</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;