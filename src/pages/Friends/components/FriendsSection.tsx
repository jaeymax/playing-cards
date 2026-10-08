import { ChevronRight, Circle, Loader2, Send, Users } from "lucide-react";
import { useState } from "react";
import FriendRow from "./FriendRow";
//import { Avatar } from "@radix-ui/react-avatar";
import { formatDistanceToNow } from "date-fns";
import { authHeaders } from "@/utils/Functions";
import { baseUrl } from "@/config/api";


export interface Friend {
  id: number;
  username: string;
  avatar: string;
  globalRank: number;
  rating: number;
  division?: string;
  status: "idle" | "in_match" | "in_lobby" | "offline";
  match?: {
    gameId: number;
    opponentName: string;
    playerScore: number;
    opponentScore: number;
  };

  lobby?: {
    lobbyId: string;
    players: number;
    maxPlayers: number;
  };
}

interface FriendsSectionProps {
  friends: Friend[],
  incomingRequests:any[],
  outgoingRequests:any[],
  setIncomingRequests:React.Dispatch<React.SetStateAction<any>>
  setOutgoingRequests:React.Dispatch<React.SetStateAction<any>>,
}

const FriendsSection: React.FC<FriendsSectionProps> = ({friends, incomingRequests, outgoingRequests, setIncomingRequests, setOutgoingRequests}) => {
  const [activeTab, setActiveTab] = useState<
    "all" | "online" | "requests"
  >("all");

  const [accepting, setAccepting] = useState(false);
  const [declining, setDeclining] = useState(false);
  const [cancellingRequest, setCancellingRequest] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any|null>(null);

  console.log('selected Requested', selectedRequest)

  const acceptRequest = async (friendshipId:number, userId:number) => {
     try {
          setAccepting(true);
          const request = incomingRequests.find(r => r.id == friendshipId)
          setSelectedRequest(request);
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

          setIncomingRequests((prevResults:any)=>prevResults.filter((user:any)=>user.user_id != userId))


    
          // Update the search results to reflect the accepted request
          // setSearchResults((prevResults) =>
          //   prevResults.map((user) =>
          //     user.id === userId
          //       ? { ...user, friendship_status: "accepted", friendship_direction: null }
          //       : user
          //   )
          // );
    
        } catch (error) {
          console.error("Error accepting friend request:", error);
        }finally{
           setAccepting(false);
        }
  }

  const declineRequest = async (friendshipId:number, userId:number) => {
     try{
         setDeclining(true);
         const request = incomingRequests.find(r => r.id == friendshipId)
         setSelectedRequest(request);
         const response = await fetch(`${baseUrl}/friends/decline`, {
             method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(await authHeaders())
            },
            body: JSON.stringify({ friendship_id: friendshipId }),
         })


          if (!response.ok) {
            throw new Error("Failed to accept friend request");
          }

          setIncomingRequests((prevResults:any)=>prevResults.filter((user:any)=>user.user_id != userId))

     }catch(error){
      console.error("Error accepting friend request:", error);
     }finally{
        setDeclining(false);
     }
  }

  const cancelRequest = async (friendshipId:number, userId:number) =>{
     try{
         setCancellingRequest(true);
         const request = outgoingRequests.find(r => r.id == friendshipId);
         console.log('request', request)
         setSelectedRequest(request);
         console.log('selected request', selectedRequest)
         const response = await fetch(`${baseUrl}/friends/cancel`, {
             method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(await authHeaders())
            },
            body: JSON.stringify({ friendship_id: friendshipId }),
         })

          if (!response.ok) {
            throw new Error("Failed to accept friend request");
          }

          setOutgoingRequests((prevResults:any)=>prevResults.filter((user:any)=>user.user_id != userId))

     }catch(error){
      console.error("Error accepting friend request:", error);
     }finally{
        setCancellingRequest(false);
     }
  }

  const idleCount = friends.filter(
    (friend) => friend.status === "idle"
  ).length;

  const matchCount = friends.filter(
    (friend) => friend.status === "in_match"
  ).length;

  const lobbyCount = friends.filter(
    (friend) => friend.status === "in_lobby"
  ).length;

  

  const onlineList = friends.filter(
    (friend) =>
      friend.status === "idle" ||
      friend.status === "in_match" ||
      friend.status === "in_lobby"
  );

  // const requests = [
  //   {
  //     id: 1,
  //     name: "Daniel Osei",
  //     avatar: "DO",
  //     globalRank: 66,
  //     rating: 1520,
  //     mutualFriends: 2,
  //     time: "2h ago",
  //   },
  //   {
  //     id: 2,
  //     name: "Michael Addo",
  //     avatar: "MA",
  //     globalRank: 143,
  //     rating: 1378,
  //     mutualFriends: 0,
  //     time: "5h ago",
  //   },
  // ];

  const getStatus = (status: string) => {
    switch (status) {
      case "idle":
        return {
          label: "Idle",
          description: "Ready to play",
          dot: "bg-emerald-500",
          text: "text-emerald-400",
        };

      case "in_match":
        return {
          label: "In Match",
          description: "Playing a game",
          dot: "bg-orange-500",
          text: "text-orange-400",
        };

      case "in_lobby":
        return {
          label: "In Lobby",
          description: "Waiting for players",
          dot: "bg-blue-500",
          text: "text-blue-400",
        };

      default:
        return {
          label: "Offline",
          description: "Offline",
          dot: "bg-gray-600",
          text: "text-gray-500",
        };
    }
  };

  const tabs = [
    {
      id: "all",
      label: "All",
      count: friends.length,
    },
    {
      id: "online",
      label: "Online",
      count: onlineList.length,
    },
    {
      id: "requests",
      label: "Requests",
      count: incomingRequests?.length
    },
    // {
    //   id: "add",
    //   label: "Add Friends",
    //   count: 0
    // },
  ] as const;

  return (
    <section className="rounded-2xl bg-gray-800/70 border border-gray-700/80 p-5 md:p-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">

        <div className="flex items-start gap-3">

          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/10 flex items-center justify-center">

            <Users className="w-4 h-4 text-blue-400" />

          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-base font-bold text-white">
                Friends
              </h2>

              <span className="px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-400 text-[10px] font-bold">
                {friends.length}
              </span>

            </div>

            <p className="text-xs text-gray-500 mt-0.5">
              Connect, play and compete with your friends
            </p>

          </div>

        </div>

        <button className="text-xs font-medium text-gray-500 hover:text-white flex items-center gap-1 transition-colors">

          Manage Friends

          <ChevronRight className="w-3.5 h-3.5" />

        </button>

      </div>


      {/* =====================================================
          TABS
      ===================================================== */}

      <div className="flex items-center gap-1 p-1 rounded-xl bg-gray-900/50 border border-gray-700/50 mb-5 custom-scroll overflow-x-auto">

        {tabs.map((tab) => (

          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-fit flex items-center justify-center gap-1.5 h-9 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-gray-700 text-white shadow-sm"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >

            {tab.label}

            {tab.count !== 0 && (

              <span
                className={`min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] font-bold ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-500"
                }`}
              >
                {tab.count}
              </span>

            )}

          </button>

        ))}

      </div>


      {/* =====================================================
          ALL FRIENDS
      ===================================================== */}

      {activeTab === "all" && (

        <div>

          {/* STATUS SUMMARY */}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-[11px] text-gray-500">
                {idleCount} Idle
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-orange-500" />

              <span className="text-[11px] text-gray-500">
                {matchCount} In Match
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-blue-500" />

              <span className="text-[11px] text-gray-500">
                {lobbyCount} In Lobby
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-gray-600" />

              <span className="text-[11px] text-gray-500">
                {friends.length - onlineList.length} Offline
              </span>

            </div>

          </div>


          <div className="space-y-2">

            {friends.map((friend) => {

              const status = getStatus(friend.status);

              return (
                <FriendRow
                  key={friend.id}
                  friend={friend}
                  status={status}
                />
              );

            })}

          </div>

        </div>

      )}


      {/* =====================================================
          ONLINE FRIENDS
      ===================================================== */}

      {activeTab === "online" && (

        <div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-emerald-500" />

              <span className="text-[11px] text-gray-500">
                {idleCount} Idle
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-orange-500" />

              <span className="text-[11px] text-gray-500">
                {matchCount} In Match
              </span>

            </div>

            <div className="flex items-center gap-1.5">

              <span className="w-2 h-2 rounded-full bg-blue-500" />

              <span className="text-[11px] text-gray-500">
                {lobbyCount} In Lobby
              </span>

            </div>

          </div>


          <div className="space-y-2">

            {onlineList.map((friend) => {

              const status = getStatus(friend.status);

              return (
                <FriendRow
                  key={friend.id}
                  friend={friend}
                  status={status}
                />
              );

            })}

          </div>

        </div>

      )}


      {/* =====================================================
          FRIEND REQUESTS
      ===================================================== */}

      {activeTab === "requests" && (
  <div className="space-y-8">
    {/* Incoming Requests */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-white">
            Friend Requests
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5">
            People who want to connect with you
          </p>
        </div>

        <span className="text-[10px] text-gray-500">
          {incomingRequests.length > 0?(`${incomingRequests.length} pending`):(<></>)}
        </span>
      </div>

      <div className="space-y-2">
          {incomingRequests?.length > 0 ? (
  <div className="space-y-2">
    {incomingRequests.map((request) => (
      <div
        key={request.id}
        className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
            {request.avatar ? (
              <img
                className="w-full h-full object-cover"
                src={request.avatar}
                alt=""
              />
            ) : (
              request.username.charAt(0).toUpperCase()
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white truncate">
                {request.username}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-500">
                {request.rating.toLocaleString()} rating
              </span>

              {request.mutualFriends > 0 && (
                <>
                  <span className="text-gray-700">•</span>

                  <span className="text-[10px] text-blue-400">
                    {request.mutualFriends} mutual{" "}
                    {request.mutualFriends === 1
                      ? "friend"
                      : "friends"}
                  </span>
                </>
              )}

              <span className="text-gray-700">•</span>

              <span className="text-[10px] text-gray-600">
                {formatDistanceToNow(
                  new Date(request.requested_at),
                  { addSuffix: true }
                )}
              </span>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              disabled={accepting}
              onClick={() =>
                acceptRequest(request.id, request.user_id)
              }
              className="h-8 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold transition-colors disabled:opacity-50"
            >
              {accepting &&
              request.id == selectedRequest?.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Accept"
              )}
            </button>

            <button
              disabled={declining}
              onClick={() =>
                declineRequest(request.id, request.user_id)
              }
              className="hidden sm:block h-8 px-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-[10px] font-semibold transition-colors disabled:opacity-50"
            >
              {declining &&
              request.id == selectedRequest?.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Decline"
              )}
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="rounded-xl border border-gray-700/40 bg-gray-900/20 px-6 py-8 text-center">
    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/10 border border-blue-500/10">
      <Users className="h-5 w-5 text-blue-400/80" />
    </div>

    <p className="text-xs font-semibold text-gray-300">
      No friend requests yet
    </p>

    <p className="mx-auto mt-1 max-w-[260px] text-[10px] leading-relaxed text-gray-600">
      Find other players, challenge them to a game, and
      start building your friends list.
    </p>

    <button
      type="button"
      onClick={() => {}}
      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-500/20 bg-blue-500/10 px-3.5 py-2 text-[10px] font-semibold text-blue-300 transition hover:border-blue-500/30 hover:bg-blue-500/[0.15] hover:text-blue-200"
    >
      <Users className="h-3.5 w-3.5" />
      Find Players
    </button>
  </div>
)}
      </div>
    </div>

    {/* Outgoing Requests */}
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-semibold text-white">
            Sent Requests
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5">
            Friend requests you've sent
          </p>
        </div>

        <span className="text-[10px] text-gray-500">
          {outgoingRequests.length > 0? `${outgoingRequests.length} pending`:<></>}
        </span>
      </div>

      <div className="space-y-2">
        {outgoingRequests?.length > 0 ? (
  <div className="space-y-2">
    {outgoingRequests.map((request) => (
      <div
        key={request.id}
        className="rounded-xl border border-gray-700/50 bg-gray-900/30 p-3"
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/20 border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0 overflow-hidden">
            {request.avatar ? (
              <img
                className="w-full h-full object-cover"
                src={request.avatar}
                alt=""
              />
            ) : (
              request.username.charAt(0).toUpperCase()
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-white truncate">
                {request.username}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] text-gray-500">
                {request.rating.toLocaleString()} rating
              </span>

              {request.mutualFriends > 0 && (
                <>
                  <span className="text-gray-700">•</span>

                  <span className="text-[10px] text-blue-400">
                    {request.mutualFriends} mutual{" "}
                    {request.mutualFriends === 1
                      ? "friend"
                      : "friends"}
                  </span>
                </>
              )}

              <span className="text-gray-700">•</span>

              <span className="text-[10px] text-gray-600">
                {formatDistanceToNow(
                  new Date(request.requested_at),
                  { addSuffix: true }
                )}
              </span>
            </div>
          </div>

          {/* Cancel */}
          <div className="shrink-0">
            <button
              disabled={
                cancellingRequest &&
                request.id === selectedRequest?.id
              }
              onClick={() =>
                cancelRequest(request.id, request.user_id)
              }
              className="h-8 px-3 rounded-lg border border-gray-700 bg-gray-800/70 hover:bg-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-200 text-[10px] font-semibold transition-colors disabled:opacity-50"
            >
              {cancellingRequest &&
              request.id === selectedRequest?.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Cancel"
              )}
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="rounded-xl border border-gray-700/40 bg-gray-900/20 px-6 py-8 text-center">
    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/10 border border-indigo-500/10">
      <Send className="h-5 w-5 text-indigo-400/80" />
    </div>

    <p className="text-xs font-semibold text-gray-300">
      No pending requests
    </p>

    <p className="mx-auto mt-1 max-w-[260px] text-[10px] leading-relaxed text-gray-600">
      You haven't sent any friend requests yet. Find
      players and connect with people you enjoy playing with.
    </p>

    <button
      type="button"
      onClick={() => {}}
      className="mt-4 inline-flex items-center gap-2 rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-2 text-[10px] font-semibold text-indigo-300 transition hover:border-indigo-500/30 hover:bg-indigo-500/[0.15] hover:text-indigo-200"
    >
      <Users className="h-3.5 w-3.5" />
      Find Players
    </button>
  </div>
)}
      </div>
    </div>
  </div>
)}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="mt-5 pt-4 border-t border-gray-700/50 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />

          <span className="text-[10px] text-gray-600">
            Friend statuses update in real-time
          </span>

        </div>

        <button className="text-[10px] text-gray-500 hover:text-white transition-colors">
          Settings
        </button>

      </div>

    </section>
  );
};

export default FriendsSection;