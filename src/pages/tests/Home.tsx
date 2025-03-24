import  { useState, useEffect } from 'react';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar backdrop filter
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sample data
  const recentActivities = [
    { id: 1, type: 'win', player: 'You', opponent: 'DarkMage44', time: '10 minutes ago', reward: '50 XP' },
    { id: 2, type: 'loss', player: 'You', opponent: 'GalacticQueen', time: '1 hour ago', reward: '5 XP' },
    { id: 3, type: 'card', action: 'acquired', cardName: 'Celestial Dragon', time: '2 hours ago', rarity: 'Legendary' }
  ];

  const announcements = [
    { 
      id: 1, 
      title: 'New Expansion: Cosmic Horizons', 
      content: 'Explore the edges of the universe with 150 new cards!',
      date: 'March 10, 2025',
      important: true
    },
    { 
      id: 2, 
      title: 'Balance Update v4.2', 
      content: 'Key changes to meta-dominant strategies.',
      date: 'March 5, 2025',
      important: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NEXUS CARDS
              </h1>
              <div className="hidden md:flex ml-10 space-x-6">
                <a href="#" className="font-medium text-white hover:text-blue-400 transition">Home</a>
                <a href="#" className="font-medium text-gray-300 hover:text-blue-400 transition">Collection</a>
                <a href="#" className="font-medium text-gray-300 hover:text-blue-400 transition">Store</a>
                <a href="#" className="font-medium text-gray-300 hover:text-blue-400 transition">Tournaments</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Currency display */}
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center px-3 py-1 rounded-full bg-gray-800 border border-blue-900">
                  <span className="text-yellow-400 mr-1">⚡</span>
                  <span className="font-medium">15,420</span>
                </div>
                <div className="flex items-center px-3 py-1 rounded-full bg-gray-800 border border-purple-900">
                  <span className="text-purple-400 mr-1">💎</span>
                  <span className="font-medium">243</span>
                </div>
              </div>
              
              {/* User profile */}
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-white font-bold">
                  JP
                </div>
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-green-500 border-2 border-gray-900"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Forge Your <span className="text-blue-400">Cosmic</span> Legacy
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl">
                Master the elements, build your deck, and conquer the galaxy in the ultimate card battling experience.
              </p>
              
              {/* Call to Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white font-semibold shadow-lg shadow-blue-900/50 transition transform hover:scale-105">
                  Play Now
                </button>
                <button className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold border border-blue-800 transition transform hover:scale-105">
                  Invite Friend
                </button>
                <button className="px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold border border-purple-800 transition transform hover:scale-105">
                  Play vs AI
                </button>
              </div>
            </div>

            {/* Animated Cards Display */}
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl"></div>
                <div className="relative aspect-w-16 aspect-h-9 bg-gray-800 rounded-xl border border-blue-900/50 overflow-hidden">
                  <div className="p-8 flex items-center justify-center">
                    {/* Add your card animation components here */}
                    <div className="relative h-64 w-48 transform rotate-12 transition-transform hover:rotate-0">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600"></div>
                      <div className="absolute inset-1 rounded-lg bg-gray-900"></div>
                    </div>
                    <div className="relative h-64 w-48 transform -rotate-12 transition-transform hover:rotate-0 ml-4">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-red-600 to-orange-600"></div>
                      <div className="absolute inset-1 rounded-lg bg-gray-900"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tournament Card */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Active Tournament</h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-blue-400">Cosmic Championship</h3>
                  <p className="text-sm text-gray-400">Registration ends in 2 days</p>
                </div>
                <div className="mb-4">
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>150 Players</span>
                    <span>200 Max</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition">
                  Join Tournament
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="p-3 rounded-lg bg-gray-750 border border-gray-700">
                      {/* Activity content */}
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'win' ? 'bg-green-900/30' :
                          activity.type === 'loss' ? 'bg-red-900/30' :
                          'bg-blue-900/30'
                        }`}>
                          {activity.type === 'win' && '🏆'}
                          {activity.type === 'loss' && '❌'}
                          {activity.type === 'card' && '🃏'}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm">
                            {activity.type === 'card' 
                              ? `${activity.action} ${activity.cardName} (${activity.rarity})`
                              : `${activity.type === 'win' ? 'Won against' : 'Lost to'} ${activity.opponent} (${activity.reward})`
                            }
                          </p>
                          <span className="text-xs text-gray-400">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-gray-800 rounded-xl border border-blue-900/50 shadow-xl">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Announcements</h2>
                {announcements.map(announcement => (
                  <div key={announcement.id} className={`p-4 rounded-lg mb-4 ${
                    announcement.important ? 'bg-purple-900/20 border border-purple-800' : 'bg-gray-750 border border-gray-700'
                  }`}>
                    <h3 className="font-semibold mb-2">{announcement.title}</h3>
                    <p className="text-sm text-gray-300">{announcement.content}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{announcement.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                NEXUS CARDS
              </h3>
              <p className="text-sm text-gray-400">© 2025 All rights reserved</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">Terms</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
