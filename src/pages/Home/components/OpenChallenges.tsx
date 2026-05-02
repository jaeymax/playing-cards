import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Sword, Users, Coins, Plus, Zap, Trophy, Clock } from "lucide-react";

// Mock data for open challenges
const mockChallenges = [
  {
    id: 1,
    creator: "Player1",
    mode: "1v1",
    stake: 0,
    createdAt: new Date(Date.now() - 5 * 60 * 1000),
    avatar: "P1",
  },
  {
    id: 2,
    creator: "Player2",
    mode: "4-player",
    stake: 10,
    createdAt: new Date(Date.now() - 2 * 60 * 1000),
    avatar: "P2",
  },
  {
    id: 3,
    creator: "Player3",
    mode: "1v1",
    stake: 5,
    createdAt: new Date(Date.now() - 10 * 60 * 1000),
    avatar: "P3",
  },
];

const OpenChallenges: React.FC = () => {
  const [mode, setMode] = useState<"1v1" | "4-player">("1v1");
  const [stake, setStake] = useState<number>(0);
  const [challenges, setChallenges] = useState(mockChallenges);

  const handleCreateChallenge = () => {
    // TODO: Integrate with socket or API to create challenge
    const newChallenge = {
      id: challenges.length + 1,
      creator: "You", // Replace with actual user
      mode,
      stake,
      createdAt: new Date(),
      avatar: "Y",
    };
    setChallenges([newChallenge, ...challenges]);
    setStake(0);
  };

  const handleJoinChallenge = (id: number) => {
    // TODO: Integrate with socket or API to join challenge
    console.log("Joining challenge", id);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60),
    );
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    return `${diffInHours}h ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 border border-gray-700/50 shadow-2xl backdrop-blur-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text text-white bg-gradien-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center gap-3">
            <Trophy className="w-8 h-8 text-yellow-400" />
            Open Challenges
            <Trophy className="w-8 h-8 text-yellow-400" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Create Challenge Section */}
          <motion.div
            className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-6 rounded-xl border border-gray-600/50 borde-blue-500/20 shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex flex-col items-center  gap-3 mb-6">
              {/* <div className="p-2 bg-blue-500/20 rounded-lg">
                <Plus className="w-6 h-6 text-blue-400" />
              </div> */}
              <h3 className="text-xl text-center font-bold text-white">Create Challenge</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Sword className="w-4 h-4 text-blue-400" />
                  Game Mode
                </label>
                <Select
                  value={mode}
                  onValueChange={(value: "1v1" | "4-player") => setMode(value)}
                >
                  <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem
                      value="1v1"
                      className="text-white hover:bg-gray-600"
                    >
                      <div className="flex items-center gap-2">
                        <Sword className="w-4 h-4" />
                        1v1 Duel
                      </div>
                    </SelectItem>
                    <SelectItem
                      value="4-player"
                      className="text-white hover:bg-gray-600"
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        4-Player Battle
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-300 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-yellow-400" />
                  Stake (Optional)
                </label>
                <Input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(Number(e.target.value))}
                  placeholder="0"
                  className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 hover:bg-gray-600/50 transition-colors"
                  min="0"
                />
              </div> */}
            </div>
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleCreateChallenge}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Create Challenge
              </Button>
            </motion.div>
          </motion.div>

          {/* Challenges Feed */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Available Challenges
              </h3>
            </div>
            {challenges.length === 0 ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Trophy className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No open challenges yet.</p>
                <p className="text-gray-500">Be the first to create one!</p>
              </motion.div>
            ) : (
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <motion.div
                    key={challenge.id}
                    className="bg-gradient-to-r from-gray-700/50 to-gray-800/50 px-2 py-1 rounded-xl border border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        {/* <Avatar className="w-12 h-12 border-2 border-blue-500/50">
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold">
                            {challenge.avatar}
                          </AvatarFallback>
                        </Avatar> */}
                        <div>
                          {/* <p className="text-white font-bold text-lg">
                            {challenge.creator}
                          </p> */}
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                              {challenge.mode === "1v1" ? (
                                <Sword className="w-3 h-3" />
                              ) : (
                                <Users className="w-3 h-3" />
                              )}
                              {challenge.mode}
                            </span>
                            {/* {challenge.stake > 0 && (
                              <span className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <Coins className="w-3 h-3" />
                                {challenge.stake}
                              </span>
                            )} */}
                            <span className="text-gray-400 text-sm flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {getTimeAgo(challenge.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          onClick={() => handleJoinChallenge(challenge.id)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 h-8 hover:to-emerald-700 text-white font-bold px-4 py-2 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
                        >
                          {/* <Zap className="w-4 h-4" /> */}
                          Join
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OpenChallenges;
