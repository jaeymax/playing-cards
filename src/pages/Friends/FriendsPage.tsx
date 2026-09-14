import React, { useState, useEffect } from "react";
import {
  UserPlus,
   X,
  User,
  UserCheck,
  Search,
} from "lucide-react";


import NavBar from "@/components/NavBar";
import { baseUrl } from "@/config/api";
import { authHeaders, customLog } from "@/utils/Functions";
import FriendsSection from "./components/FriendsSection";
import FriendChallenges from "./components/FriendChallenges";
import RivalsSection from "./components/RivalsSection";
import RecentActivity from "./components/RecentActivity";
import FriendStreaks from "./components/FriendStreaks";
import FriendsLeaderboard from "./components/FriendsLeaderboard";




/* ============================================================
   STATUS CONFIG
============================================================ */



interface FriendSearchUser {
  id: number;
  username: string;
  image_url: string | null;
  rating: number;
  online_status: boolean;
  last_active: string;
  country_code: string | null;
  location: string | null;
  is_guest: boolean;
  is_bot: boolean;
  friendship_status: "none" | "pending" | "accepted" | "blocked";
  friendship_direction: "incoming" | "outgoing" | null;
  friendship_id: number | null;
}

import { Friend } from "./components/FriendsSection";


const FriendsPage: React.FC = () => {
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] =
  useState<FriendSearchUser[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendSearchUser[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<FriendSearchUser[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  console.log('Friends:', friends);
  customLog("FriendsPage rendered", { searchQuery, searching, searchResults, incomingRequests, outgoingRequests, friends });


  const getFriends = async () => {
    try {
      const response = await fetch(`${baseUrl}/friends`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders())
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friends");
      }

      const data = await response.json();
      setFriends(data.friends);
      setIncomingRequests(data.incoming_requests);
      setOutgoingRequests(data.outgoing_requests);

    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const getIncomingRequests = async () => {
    try {
      const response = await fetch(`${baseUrl}/friends/incoming`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders())
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch incoming requests");
      }

      const data = await response.json();
      setIncomingRequests(data.requests);

    } catch (error) {
      console.error("Error fetching incoming requests:", error);
    }
  };

  const getOutgoingRequests = async () => {
    try {
      const response = await fetch(`${baseUrl}/friends/sent-requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders())
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch outgoing requests");
      }

      const data = await response.json();
      setOutgoingRequests(data.requests);

    } catch (error) {
      console.error("Error fetching outgoing requests:", error);
    }
  };

  useEffect(() => {
    getFriends();
    getIncomingRequests();
    getOutgoingRequests();
  }, []);


  const allFriends: Friend[] = [
      {
    id: 1,
    username: "Kofi Mensah",
    avatar: "KM",
    rating: 1824,
    division: "Master",
    globalRank: 21,
    status: "idle",
  },

  {
    id: 2,
    username: "Ama Owusu",
    avatar: "AO",
    rating: 1590,
    division: "Expert",
    globalRank: 66,
    status: "in_match",

    match: {
      gameId: 4821,
      opponentName: "Kwame Asante",
      playerScore: 7,
      opponentScore: 5,
    },
  },

  {
    id: 3,
    username: "Yaw Boateng",
    avatar: "YB",
    rating: 1482,
    division: "Expert",
    globalRank: 112,
    status: "in_lobby",

    lobby: {
      lobbyId: "SP4829",
      players: 2,
      maxPlayers: 4,
    },
  },

  {
    id: 4,
    username: "Kwame Asante",
    avatar: "KA",
    rating: 1642,
    division: "Expert",
    globalRank: 48,
    status: "idle",
  },
    {
      id: 10,
      username: "Kwame Asante",
      avatar: "KA",
      globalRank: 184,
      rating: 1290,
      division: "Contender",
      status: "offline",
    },

    {
      id: 11,
      username: "Kojo Mensah",
      avatar: "KM",
      globalRank: 241,
      rating: 1210,
      division: "Contender",
      status: "offline",
    },
  ];

  const sendFriendRequest = async (userId: number) => {
    try {
      const response = await fetch(`${baseUrl}/friends/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders())
        },
        body: JSON.stringify({ friend_id: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to send friend request");
      }

      // Update the search results to reflect the sent request
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.id === userId
            ? { ...user, friendship_status: "pending", friendship_direction: "outgoing" }
            : user
        )
      );

    } catch (error) {
      console.error("Error sending friend request:", error);
    }
  };

  const acceptFriendRequest = async (friendshipId: number, userId: number) => {
    try {
      const response = await fetch(`${baseUrl}/friends/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders())
        },
        body: JSON.stringify({ friendship_id: friendshipId }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept friend request");
      }

      // Update the search results to reflect the accepted request
      setSearchResults((prevResults) =>
        prevResults.map((user) =>
          user.id === userId
            ? { ...user, friendship_status: "accepted", friendship_direction: null }
            : user
        )
      );

    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const getSearchResults = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    setSearching(true)
    try {

      const response = await fetch(`${baseUrl}/friends/search?search=${encodeURIComponent(searchQuery)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders())
        },
      } );
      const data = await response.json();
      setSearchResults(data.users);

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

    } catch (error) {
      console.error("Error searching for friends:", error);
    }finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (!showAddFriendsModal) return;

     getSearchResults();

  }, [searchQuery, showAddFriendsModal]);


  const getFriendButton = (user: FriendSearchUser) => {
  if (user.friendship_status === "accepted") {
    return {
      text: "Friends",
      icon: <UserCheck className="w-3 h-3" />,
      className:
        "bg-emerald-500/10 text-emerald-400 cursor-default",
      disabled: true,
    };
  }

  if (
    user.friendship_status === "pending" &&
    user.friendship_direction === "outgoing"
  ) {
    return {
      text: "Sent",
      icon: <UserCheck className="w-3 h-3" />,
      className:
        "bg-gray-800 text-gray-500 cursor-default",
      disabled: true,
    };
  }

  if (
    user.friendship_status === "pending" &&
    user.friendship_direction === "incoming"
  ) {
    return {
      text: "Accept",
      icon: <UserCheck className="w-3 h-3" />,
      className:
        "bg-emerald-600 hover:bg-emerald-500 text-white",
      disabled: false,
    };
  }

  if (user.friendship_status === "blocked") {
    return {
      text: "Blocked",
      icon: <X className="w-3 h-3" />,
      className:
        "bg-gray-800 text-gray-600 cursor-default",
      disabled: true,
    };
  }

  return {
    text: "Add",
    icon: <UserPlus className="w-3 h-3" />,
    className:
      "bg-blue-600 hover:bg-blue-500 text-white",
    disabled: false,
  };
};


  

  const closeModal = () => {
    setShowAddFriendsModal(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps={true} />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 max-w-7xl">

        {/* ======================================================
            PAGE HEADER
        ====================================================== */}

        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-black text-white">
                  Friends
                </h1>

                <span className="px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold">
                  48
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                Connect, compete and keep the rivalry going.
              </p>
            </div>

            {/* ADD FRIENDS BUTTON */}

            <button
              onClick={() => setShowAddFriendsModal(true)}
              className="h-10 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              Add Friends
            </button>

          </div>
        </div>

        {/* ======================================================
            QUICK STATS
        ====================================================== */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">

          <div className="rounded-xl bg-gray-800/60 border border-gray-700/70 p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-600">
              Friends
            </p>

            <p className="text-xl font-black text-white mt-1">
              48
            </p>
          </div>

          <div className="rounded-xl bg-gray-800/60 border border-gray-700/70 p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-600">
              Online
            </p>

            <p className="text-xl font-black text-emerald-400 mt-1">
              12
            </p>
          </div>

          <div className="rounded-xl bg-gray-800/60 border border-gray-700/70 p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-600">
              Rivals
            </p>

            <p className="text-xl font-black text-orange-400 mt-1">
              6
            </p>
          </div>

          <div className="rounded-xl bg-gray-800/60 border border-gray-700/70 p-4">
            <p className="text-[10px] uppercase tracking-wider text-gray-600">
              Requests
            </p>

            <p className="text-xl font-black text-blue-400 mt-1">
              3
            </p>
          </div>

        </div>

        {/* ======================================================
            FRIEND CHALLENGES
        ====================================================== */}

        <div className="mb-6">
          <FriendChallenges />
        </div>

        {/* ======================================================
            MAIN GRID
        ====================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ====================================================
              MAIN COLUMN
          ==================================================== */}

          <div className="lg:col-span-2 space-y-6">

            <FriendsSection friends={allFriends} />

            <RivalsSection />

            <RecentActivity />

          </div>

          {/* ====================================================
              SIDEBAR
          ==================================================== */}

          <aside className="space-y-6">

            {/* ADD FRIENDS CARD */}

            <section className="rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/10 p-5">

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4">
                <UserPlus className="w-4 h-4 text-blue-400" />
              </div>

              <h3 className="text-sm font-bold text-white">
                Grow your SparPlay circle
              </h3>

              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                Find players you know, add new friends and build rivalries
                along the way.
              </p>

              <button
                onClick={() => setShowAddFriendsModal(true)}
                className="w-full mt-4 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                Find Players
              </button>

            </section>

            {/* FRIEND STREAK */}

            <FriendStreaks />

            {/* FRIEND RANKING */}

            <FriendsLeaderboard />

          </aside>

        </div>

      </main>

      {/* ==========================================================
          ADD FRIENDS MODAL
      ========================================================== */}

      {showAddFriendsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >

          {/* BACKDROP */}

          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* MODAL */}

           <div
    className="
      relative
      w-full
      h-full
      bg-gray-900
      overflow-hidden

      sm:h-auto
      sm:max-h-[90vh]
      sm:max-w-md
      sm:rounded-2xl
      sm:border
      sm:border-gray-700/80
      sm:shadow-2xl
    "
  >

            {/* ==================================================
                MODAL HEADER
            ================================================== */}

            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <UserPlus className="w-4 h-4 text-blue-400" />
                </div>

                <div>
                  <h2 className="text-sm font-bold text-white">
                    Add Friends
                  </h2>

                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Find players and grow your circle
                  </p>
                </div>

              </div>

              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

            </div>

            {/* ==================================================
                SEARCH
            ================================================== */}

            <div className="p-5 pb-3 borde">

              <div className="relative">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by username..."
                  autoFocus
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 transition-all"
                />

                {/* SEARCH SPINNER */}

                {searching && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">

                    <div className="w-4 h-4 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin" />

                  </div>
                )}

                {/* CLEAR SEARCH */}

                {!searching && searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}

              </div>

            </div>

            {/* ==================================================
                RESULTS
            ================================================== */}

            <div className="px-5 pb-5 bord">

              <div className="flex items-center justify-between mb-2">

                <p className="text-[10px] uppercase tracking-wider font-bold text-gray-600">
                  {searchQuery
                    ? "Search results"
                    : "Players you may know"}
                </p>

                {!searching && (
                  <span className="text-[10px] text-gray-600">
                    {searchResults.length} players
                  </span>
                )}

              </div>

              <div className="max-h-[360px overflow-y-auto space-y-1.5 pr-1">

                {/* SEARCHING */}

                {searching ? (
                  <div className="py-12 flex flex-col items-center justify-center">

                    <div className="w-8 h-8 border-2 border-gray-700 border-t-blue-500 rounded-full animate-spin" />

                    <p className="text-xs text-gray-500 mt-3">
                      Searching players...
                    </p>

                  </div>

                ) : searchResults.length === 0 ? (

                  /* NO RESULTS */

                  <div className="py-12 text-center">

                    <div className="w-10 h-10 rounded-xl bg-gray-800 mx-auto flex items-center justify-center">
                      <Search className="w-4 h-4 text-gray-600" />
                    </div>

                    <p className="text-sm font-semibold text-gray-400 mt-3">
                      No players found
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      Try searching for another username.
                    </p>

                  </div>

                ) : (

    /* USER RESULTS */

    searchResults.map((user) => {
      const friendButton = getFriendButton(user);

      return (
        <div
          key={user.id}
          className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800/70 transition-colors"
        >

          {/* AVATAR */}

          <div className="relative flex-shrink-0">

            {user.image_url ? (
              <img
                src={user.image_url}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover border border-gray-700"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
            )}

            {/* ONLINE INDICATOR */}

            {user.online_status && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-gray-900" />
            )}

          </div>

          {/* USER INFORMATION */}

          <div className="flex-1 min-w-0">

            <div className="flex items-center gap-2">

              <p className="text-sm font-bold text-gray-200 truncate">
                {user.username}
              </p>

              {user.online_status && (
                <span className="text-[9px] text-emerald-400 font-semibold">
                  Online
                </span>
              )}

            </div>

            <div className="flex items-center gap-2 mt-1">

              {/* RATING */}

              <span className="text-[10px] text-blue-400 font-semibold">
                {user.rating.toLocaleString()} rating
              </span>

              {user.location && (
                <>
                  <span className="text-gray-700">
                    •
                  </span>

                  <span className="text-[10px] text-gray-600 truncate">
                    {user.location}
                  </span>
                </>
              )}

            </div>

          </div>

          {/* FRIEND BUTTON */}

          <button
            disabled={friendButton.disabled}
            onClick={async () => {
              if (user.friendship_status === "none") {
                console.log("Send friend request:", user.id);
                await sendFriendRequest(user.id);
     
              }

              if (
                user.friendship_status === "pending" &&
                user.friendship_direction === "incoming"
              ) {
                console.log("Accept friend request:", user.id);
                await acceptFriendRequest(user.friendship_id as number, user.id);

              }
            }}
            className={`flex-shrink-0 h-8 px-3 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 transition-colors ${friendButton.className}`}
          >
            {friendButton.icon}
            {friendButton.text}
          </button>

        </div>
      );
    })

  )}

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default FriendsPage;