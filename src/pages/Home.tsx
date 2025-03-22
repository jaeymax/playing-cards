
import PlayGame from "@/components/PlayGame";

import { ChevronRight } from "lucide-react";

{
  /* <div className="flex gap-14 sm:flex-row sm:items-center flex-col" >
  <Leaderboard/>
  <TournamentWinners/>
</div> */
}

const Home = () => {
  const announcements = [
    {
      id: 1,
      title: "Weekend Tournament",
      date: "Mar 15, 2025",
      desc: "Join our weekend tournament with $500 prize pool!",
    },
    {
      id: 2,
      title: "New Card Pack",
      date: "Mar 8, 2025",
      desc: "Discover our new expansion 'Mystic Waters'",
    },
    {
      id: 3,
      title: "System Maintenance",
      date: "Mar 5, 2025",
      desc: "Scheduled maintenance on March 6th",
    },
  ];

  const onlineFriends = [
    {
      id: 1,
      name: "JaneDoe",
      status: "online",
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      name: "JohnSmith",
      status: "in-game",
      avatar:
        "https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid",
    },
    {
      id: 3,
      name: "BobbyTables",
      status: "online",
      avatar:
        "https://img.freepik.com/free-vector/cute-ninja-gaming-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-flat_138676-8079.jpg?semt=ais_hybrid",
    },
  ];

  const topPlayers = [
    {
      id: 1,
      name: "CardMaster99",
      rating: 2345,
      avatar:
        "https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg",
    },
    {
      id: 2,
      name: "SpaChamp",
      rating: 2280,
      avatar:
        "https://img.freepik.com/free-vector/cute-robot-gaming-cartoon-vector-icon-illustration-people-technology-icon-isolated-flat-vector_138676-11801.jpg",
    },
    {
      id: 3,
      name: "AcePlayer",
      rating: 2210,
      avatar:
        "https://t4.ftcdn.net/jpg/09/02/73/97/360_F_902739740_fQTwwpH4YH5NTRJbMTAd2Z6Q1JQKT1iv.jpg",
    },
    {
      id: 4,
      name: "KingOfCards",
      rating: 2185,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXcLBAnNaG9u_juSWT6vyOeW1Q3N3xh0QWA&s",
    },
    {
      id: 5,
      name: "SpaDemon",
      rating: 2150,
      avatar:
        "data:image/jpeg;base64,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",
    },
  ];

  return (
    <div className="containe mx-auto p-10 bg-gray-">
 

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-sm">

          {/* Left side */}
          <div className="left side lg:col-span-2 space-y-4">
          <PlayGame />
            {/* Featured Tournament */}
            <div className="bg-gray-300/10 rounded-xl border border-blue-500/10 shadow-xl overflow-hidden mb-8">
              <div className="relative">
                <img
                  src="https://www.shutterstock.com/image-vector/poker-tournament-banner-table-cards-600nw-2048694602.jpg"
                  alt="Tournament Banner"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="text-yellow-400 font-bold mb-1">
                    FEATURED TOURNAMENT
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    Spring Championship 2025
                  </h3>
                  <p className="text-gray-300 mb-2">
                    Compete for a $1,000 prize pool and glory!
                  </p>
                  <button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-gray-900 px-4 py-2 rounded-lg font-medium shadow-lg shadow-amber-900/30 transition transform hover:scale-105 flex items-center">
                    Register Now <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>

              <div className="p-4 grid grid-cols-3 text-center border-t border-blue-900/50">
                <div>
                  <div className="text-blue-400 text-sm">PARTICIPANTS</div>
                  <div className="text-white font-bold text-xl">128/256</div>
                </div>
                <div>
                  <div className="text-blue-400 text-sm">STARTS IN</div>
                  <div className="text-white font-bold text-xl">3 Days</div>
                </div>
                <div>
                  <div className="text-blue-400 text-sm">FORMAT</div>
                  <div className="text-white font-bold text-xl">
                    Single Elim
                  </div>
                </div>
              </div>
            </div>

            {/*  Recent Games */}
            <div className="bg-gray-800 rounded-xl border border-blue-900 shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4">Your Recent Games</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-500/10">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-3">WIN</div>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvXcLBAnNaG9u_juSWT6vyOeW1Q3N3xh0QWA&s"
                      alt="Opponent"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="text-white">vs. CardMaster99</div>
                  </div>
                  <div className="text-gray-400 text-sm">10 min ago</div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-500/10">
                  <div className="flex items-center">
                    <div className="text-red-400 font-bold mr-3">LOSS</div>
                    <img
                      src="https://t4.ftcdn.net/jpg/09/02/73/97/360_F_902739740_fQTwwpH4YH5NTRJbMTAd2Z6Q1JQKT1iv.jpg"
                      alt="Opponent"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="text-white">vs. SpaChamp</div>
                  </div>
                  <div className="text-gray-400 text-sm">2 hours ago</div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-500/10">
                  <div className="flex items-center">
                    <div className="text-green-400 font-bold mr-3">WIN</div>
                    <img
                      src="https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg"
                      alt="Opponent"
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <div className="text-white">vs. KingOfCards</div>
                  </div>
                  <div className="text-gray-400 text-sm">Yesterday</div>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg text-sm font-medium transition">
                View Game History
              </button>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="right-sidebar space-y-8">
            {/* Top Players */}
            <div className="bg-gray-800 rounded-xl border border-blue-900 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Players</h2>
                <a
                  href="/leaderboard"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </a>
              </div>

              <div className="space-y-3">
                {topPlayers.map((player, index) => (
                  <div
                    key={player.id}
                    className="flex items-center p-2 bg-gray-750 rounded-lg border border-gray-500/10"
                  >
                    <div className="w-6 text-center font-bold text-gray-400">
                      {index + 1}
                    </div>
                    <img
                      src={player.avatar}
                      alt={player.name}
                      className="w-8 h-8 rounded-full mx-2"
                    />
                    <div className="flex-1 text-white">{player.name}</div>
                    <div className="text-yellow-400 font-bold">
                      {player.rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Announcements */}
            <div className="bg-gray-800 rounded-xl border border-gray-500/10 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Announcements</h2>
                <a
                  href="/announcements"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  View All
                </a>
              </div>

              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border-l-4 border-blue-500 pl-3 py-1"
                  >
                    <h3 className="text-white font-bold">
                      {announcement.title}
                    </h3>
                    <div className="text-gray-400 text-xs mb-1">
                      {announcement.date}
                    </div>
                    <p className="text-gray-300 text-sm">{announcement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Online Friends */}
            <div className="bg-gray-800 rounded-xl border border-gray-500/10 shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Friends Online</h2>
                <a
                  href="/friends"
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  All Friends
                </a>
              </div>

              {onlineFriends.length > 0 ? (
                <div className="space-y-3">
                  {onlineFriends.map((friend) => (
                    <div
                      key={friend.id}
                      className="flex items-center justify-between p-2 bg-gray-750 rounded-lg border border-gray-500/10"
                    >
                      <div className="flex items-center">
                        <div className="relative">
                          <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                              friend.status === "online"
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            } border-2 border-gray-800`}
                          ></div>
                        </div>
                        <div className="ml-2">
                          <div className="text-white">{friend.name}</div>
                          <div className="text-gray-400 text-xs capitalize">
                            {friend.status}
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition transform hover:scale-105">
                        Invite
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-400">
                  No friends online right now
                </div>
              )}
            </div>
          </div>
        </div>


    </div>
  );
};
// https://i.pinimg.com/originals/73/8a/f6/738af624ab6799643747e5099e622cce.gif
export default Home;
