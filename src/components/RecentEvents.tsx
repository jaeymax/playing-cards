import React, { useState, useEffect } from 'react';
import { Shield, Sword, Trophy, Users, Star, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const RecentEvents = () => {
  // Sample data - in a real app, this would come from your backend
  const [events, setEvents] = useState([
    {
      id: 1,
      type: 'battle',
      player: 'DragonMaster',
      description: 'Won a ranked match against StormChaser',
      time: '2 mins ago',
      icon: 'sword'
    },
    {
      id: 2,
      type: 'achievement',
      player: 'SpellWeaver',
      description: 'Unlocked Legendary Card Pack',
      time: '5 mins ago',
      icon: 'star'
    },
    {
      id: 3,
      type: 'tournament',
      player: 'MysticKnight',
      description: 'Started a new tournament',
      time: '10 mins ago',
      icon: 'trophy'
    },
    {
      id: 4,
      type: 'social',
      player: 'ArcaneMage',
      description: 'Joined Team Phoenix Raiders',
      time: '15 mins ago',
      icon: 'users'
    },
    {
      id: 5,
      type: 'ranked',
      player: 'ShadowBlade',
      description: 'Reached Diamond Rank',
      time: '20 mins ago',
      icon: 'crown'
    }
  ]);

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'sword':
        return <Sword className="w-5 h-5 text-red-500" />;
      case 'star':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-purple-500" />;
      case 'users':
        return <Users className="w-5 h-5 text-blue-500" />;
      case 'crown':
        return <Crown className="w-5 h-5 text-amber-500" />;
      default:
        return <Shield className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-md bg-gray-900 text-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Recent Events</h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="flex items-center space-x-4 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-200 transform hover:scale-102"
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              <div className="p-2 rounded-full bg-gray-700">
                {getIcon(event.icon)}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">
                  <span className="text-blue-400">{event.player}</span> {event.description}
                </p>
                <p className="text-xs text-gray-400">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
};

export default RecentEvents;