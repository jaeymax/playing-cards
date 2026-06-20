import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { removeToken } from "@/utils/Functions";
import { useAppContext } from "@/contexts/AppContext";
import Modal from "@/components/Modal";
import { countries } from "@/data/countries";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import RatingGraph from "./components/RatingGraph";

type ProfileTab =
  | "overview"
  | "matches"
  | "statistics"
  | "achievements"
  | "settings";

// Mock player data - replace with actual user data from context
const PLAYER = {
  username: "KingSlayer",
  initials: "KS",
  memberSince: "Jan 2023",
  lastActive: "Today",
  rating: 2847,
  peakRating: 2901,
  rank: "Grandmaster",
  nextRank: "Mythic",
  nextRankRating: 3000,
  tournamentsPlayed: 134,
  tournamentsWon: 41,
  matchesPlayed: 1209,
  matchWinRate: 58.2,
  top3Finishes: 87,
  bestStreak: 9,
  currentStreak: 7,
  globalPercentile: 1,
  avgAccuracy: 82,
  avgMoveSpeed: 4.2,
  medals: { gold: 41, silver: 28, bronze: 18 },
  skills: [
    { label: "Aggression", value: 91, color: "#e8613a" },
    { label: "Defense", value: 74, color: "#3b82f6" },
    { label: "Consistency", value: 83, color: "#22c55e" },
    { label: "Adaptability", value: 68, color: "#a78bfa" },
    { label: "Clutch factor", value: 95, color: "#f59e0b" },
  ],
  ratingHistory: [
    { t: "T1", rating: 1000, won: false },
    { t: "T2", rating: 2534, won: true },
    { t: "T3", rating: 2518, won: false },
    { t: "T4", rating: 2570, won: true },
    { t: "T5", rating: 2605, won: true },
    { t: "T6", rating: 2648, won: true },
    { t: "T7", rating: 2620, won: false },
    { t: "T8", rating: 2700, won: true },
    { t: "T9", rating: 2741, won: false },
    { t: "T10", rating: 2789, won: true },
    { t: "T11", rating: 2810, won: false },
    { t: "T12", rating: 2847, won: true },
    { t: "T13", rating: 3847, won: true },
  ],
};

type AnimatedNumberProps = {
  value: number;
  duration?: number;
  format?: (v: number) => React.ReactNode;
};

function AnimatedNumber({
  value,
  duration = 1200,
  format = (v: number) => v,
}: AnimatedNumberProps) {
  const [display, setDisplay] = useState(0);
  const start = useRef<number | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    start.current = null;
    const animate = (ts: number) => {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(ease * value));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [value, duration]);

  return <span>{format(display)}</span>;
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
  sub?: string;
  accent?: string;
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg" style={{ color: accent || "#a78bfa" }}>
          {icon}
        </span>
        <span className="text-xs text-gray-400 font-medium">{label}</span>
      </div>
      <div className="text-xl font-bold text-gray-100">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

function MedalBadge({
  emoji,
  count,
  label,
  bgClass,
  textClass,
}: {
  emoji: string;
  count: number;
  label: string;
  bgClass: string;
  textClass: string;
}) {
  return (
    <div
      className={`${bgClass} border border-gray-700 rounded-lg p-4 text-center`}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <div className={`text-2xl font-bold font-serif ${textClass}`}>
        <AnimatedNumber value={count} duration={900} />
      </div>
      <div
        className={`text-xs mt-2 font-semibold tracking-wider uppercase ${textClass} opacity-70`}
      >
        {label}
      </div>
    </div>
  );
}

function SkillBar({
  label,
  value,
  color,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  delay: number;
}) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 100 + delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-xs text-purple-200 font-medium">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: color,
            borderRadius: "999px",
            transition: "width 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  const idx = PLAYER.ratingHistory.findIndex((r) => r.t === label);
  const delta = idx > 0 ? d.value - PLAYER.ratingHistory[idx - 1].rating : 0;
  return (
    <div className="bg-gray-900 border border-purple-400 border-opacity-25 rounded-lg p-3">
      <div className="text-xs text-purple-200 mb-1 font-semibold">{label}</div>
      <div className="text-lg font-bold text-white font-serif">
        {d.value.toLocaleString()}
      </div>
      {delta !== 0 && (
        <div
          className="text-xs mt-1"
          style={{ color: delta > 0 ? "#4ade80" : "#f87171" }}
        >
          {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}
        </div>
      )}
    </div>
  );
};

const ProfilePage: React.FC = () => {
  
  const { user, updateUser } = useAppContext();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    phone: "",
    country: "",
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = () => {
    removeToken();
    updateUser(null);
    navigate("/signin");
  };

  const handleEditClick = () => {
    setEditFormData({
      phone: user?.phone || "",
      country: user?.country || "",
    });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Call API to update user profile
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: editFormData.phone,
          country: editFormData.country,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

 // const ratingProgress = ((PLAYER.rating - 2700) / (3000 - 2700)) * 100;
 const getRatingProgress = () => {
  if(!user?.is_rated) return 0;
  const progress = ((user?.rating - user?.current_rank_min_rating) / (user?.next_rank_min_rating - user?.current_rank_min_rating)) * 100;
  return progress;
 }

  // const ratingProgress = user?.is_rated
  //   ? ((user.next_rank_min_rating - user.rating)  /
  //       (user.rating_to_next_rank - 10000)) *
  //     100
  //   : 0;
  const seasonDelta = PLAYER.rating - PLAYER.ratingHistory[0].rating;

  const getTournamentWinRate = () => {
    return user?.tournaments_played
      ? (
          (((user?.tournaments_won as number) /
            user?.tournaments_played) as number) * 100
        ).toFixed(1)
      : "0.0";
  };

  const getMatchesWinRate = () => {
    return user?.games_played
      ? (
          (((user?.games_won as number) / user?.games_played) as number) * 100
        ).toFixed(1)
      : "0.0";
  };

  const getPodiumRate = () => {
    return user?.tournaments_played
      ? (
          (((user?.podium_finishes as number) /
            user?.tournaments_played) as number) * 100
        ).toFixed(1)
      : "0.0";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar showSignUps={true} />

      <div
        className={`max-w-3xl w-full mx-auto px-4 py-8 transition-all duration-500 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Header Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-6 mb-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0 mx-auto sm:mx-0 borde w-20 h-20 md:w-24 md:h-24">
              <div className="w-full h-full sm:w-full sm:h-full rounded-full bg-gradient-to-br from-purple-600 to-orange-500 p-0.5">
                <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                  <img
                    src={
                      user?.image_url ||
                      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                    }
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-500 border-2 border-gray-900" />
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Username + Rank */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 text-center sm:text-left">
                <h1 style={{color: user?.rank_color}} className="text-2xl sm:text-3xl font-bold text-gray-100 break-all">
                  {user?.username}
                </h1>

                <span style={{color: user?.rank_color, borderColor: user?.rank_color}} className="self-center sm:self-auto b-orange-500/15 border border-orange-500/35 text-orange-400 text-xs font-semibold px-2.5 py-1 rounded-full w-fit">
                 {user?.rank || "Unranked"}
                </span>
              </div>

              {/* Meta */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-center sm:text-left">
                <p className="text-xs text-gray-500">
                  Member since{" "}
                  {new Date(user?.created_at as string).toLocaleDateString(
                    "en-GB",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                  {" · "}
                  Last active {PLAYER.lastActive}
                </p>

                {/* Location */}
                <span className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs text-gray-300 w-fit self-center sm:self-auto">
                  📍 Ghana
                </span>
              </div>

              {/* Actions */}
              {!user?.is_guest && (
              <div className="mt-4 flex justify-center sm:justify-start">
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white text-sm font-medium hover:opacity-90 transition"
                >
                  Edit Profile
                </button>
              </div>
              )}

              {/* Rating Progress */}
              {
                user?.is_rated && (
              <div className="mt-5">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mb-2">
                  <span className="text-xs text-gray-400">
                    {user?.rating.toLocaleString()} /{" "}
                    {user?.next_rank_min_rating?.toLocaleString()} → {user?.next_rank}
                  </span>

                  <span className="text-xs font-semibold text-orange-500">
                    {user?.rating_to_next_rank} pts to go
                  </span>
                </div>

                <div className="h-2 bg-gray-700 rounded-full overflow-hidden w-full sm:max-w-md">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-orange-500 rounded-full transition-all duration-1000"
                    style={{ width: `${getRatingProgress()}%` }}
                  />
                </div>
              </div>
                )
              }

              {/* Mobile Rating Block */}
              <div className="mt-5 sm:hidden text-center">
                <div className="text-xs font-bold text-gray-400 tracking-wide">
                  RATING
                </div>

                <div className="text-4xl font-bold text-gray-100 mt-1">
                  <AnimatedNumber
                    value={user?.rating as number}
                    duration={1400}
                    format={(v) => v.toLocaleString()}
                  />
                </div>

                <div className="text-xs text-gray-500 mt-1">
                  Peak {user?.peak_rating?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Desktop Rating Block */}
            <div className="hidden sm:block text-right flex-shrink-0">
              <div className="text-xs font-bold text-gray-400 tracking-wide">
                RATING
              </div>

              {
                user?.is_rated ? (
              <div className="text-4xl font-bold text-gray-100 mt-1">
                <AnimatedNumber
                  value={user?.rating as number}
                  duration={1400}
                  format={(v) => v.toLocaleString()}
                />
              </div  >
                ):(
                  <p className="text-3xl font-bold text-gray-100 mt-1" >
                    Unrated
                  </p>
                )
              }

              <div className="text-xs text-gray-500 mt-1">
                Peak {user?.peak_rating?.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <StatCard
            icon="🏆"
            label="Tournaments won"
            value={
              <AnimatedNumber
                value={(user?.tournaments_won as number) || 0}
                duration={1000}
              />
            }
            sub={`${getTournamentWinRate()}% win rate`}
            accent="#fbbf24"
          />
          <StatCard
            icon="🎮"
            label="Tournaments played"
            value={
              <AnimatedNumber
                value={(user?.tournaments_played as number) || 0}
                duration={1000}
              />
            }
            sub="All time"
            accent="#a78bfa"
          />
          <StatCard
            icon="⚔️"
            label="Matches played"
            value={
              <AnimatedNumber
                value={(user?.games_played as number) || 0}
                duration={1200}
                format={(v) => v.toLocaleString()}
              />
            }
            sub={`${getMatchesWinRate()}% wins`}
            accent="#3b82f6"
          />
          <StatCard
            icon="🎯"
            label="Podium finishes"
            value={
              <AnimatedNumber
                value={(user?.podium_finishes as number) || 0}
                duration={1000}
              />
            }
            sub={`${getPodiumRate()}% rate`}
            accent="#22c55e"
          />
          <StatCard
            icon="🔥"
            label="Current streak"
            value={`${user?.current_winning_streak || 0}W`}
            sub={`Best: ${user?.max_winning_streak || 0}W`}
            accent="#e8613a"
          />
          <StatCard
            icon="🌍"
            label="Global rank"
            value={`# ${user?.is_guest ? "Unranked" : user?.global_rank}`}
            sub="Worldwide"
            accent="#f59e0b"
          />
        </div>

        {/* Medals Section */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
              Medal Cabinet
            </h2>
            <div className="flex-1 h-px bg-gray-700" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            <MedalBadge
              emoji="🥇"
              count={(user?.gold_medals as number) || 0}
              label="Gold"
              bgClass="bg-gray-400 bg-opacity-10"
              textClass="text-yellow-400"
            />
            <MedalBadge
              emoji="🥈"
              count={(user?.silver_medals as number) || 0}
              label="Silver"
              bgClass="bg-gray-400 bg-opacity-10"
              textClass="text-gray-300"
            />
            <MedalBadge
              emoji="🥉"
              count={(user?.bronze_medals as number) || 0}
              label="Bronze"
              bgClass="bg-gray-400 bg-opacity-10"
              textClass="text-orange-400"
            />
            <MedalBadge
              emoji="🎖️"
              count={
                (user?.gold_medals || 0) +
                (user?.silver_medals || 0) +
                (user?.bronze_medals || 0)
              }
              label="Total"
              bgClass="bg-gray-400 bg-opacity-10"
              textClass="text-purple-300"
            />
          </div>
        </div>

        {/* Rating Chart */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-xs font-bold text-gray-400 tracking-widest uppercase">
              Rating History
            </h2>
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-xs font-semibold text-green-400 whitespace-nowrap">
              ▲ +{seasonDelta} since last tournament
            </span>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={PLAYER.ratingHistory}>
                <defs>
                  <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="t"
                  tick={{ fill: "#7c6e9c", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={["dataMin - 80", "dataMax + 40"]}
                  tick={{ fill: "#7c6e9c", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="rating"
                  stroke="#a78bfa"
                  strokeWidth={2.5}
                  fill="url(#ratingGrad)"
                  dot={(props) => {
                    const d = PLAYER.ratingHistory[props.index];
                    return (
                      <circle
                        key={props.index}
                        cx={props.cx}
                        cy={props.cy}
                        r={d.won ? 6 : 4}
                        fill={d.won ? "#fbbf24" : "#a78bfa"}
                        stroke={d.won ? "#fbbf24" : "#1e1030"}
                        strokeWidth={2}
                      />
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>


            <div className="flex gap-4 mt-4 px-1">
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                Tournament win
              </span>
              <span className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                Other result
              </span>
            </div>
          </div>
        </div>

              <RatingGraph
  history={[
    { date: "Jan", rating: 1180 },
    { date: "Feb", rating: 1230 },
    { date: "Mar", rating: 1390 },
    { date: "Apr", rating: 1450 },
    { date: "May", rating: 1620 },
    { date: "Jun", rating: 1810 },
    { date: "Jul", rating: 1960 },
    { date: "Aug", rating: 2140 },
  ]}
/>
        {/* Skills and Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 mt-6">
          {/* Skills */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
              Skill Breakdown
            </h3>
            {PLAYER.skills.map((s, i) => (
              <SkillBar
                key={s.label}
                label={s.label}
                value={s.value}
                color={s.color}
                delay={i * 80}
              />
            ))}
          </div>

          {/* Facts */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <h3 className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">
              Quick Facts
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">⚡ Avg. move speed</span>
                <span className="text-gray-200 font-semibold">
                  {PLAYER.avgMoveSpeed}s
                </span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">🎯 Avg. accuracy</span>
                <span className="text-gray-200 font-semibold">
                  {PLAYER.avgAccuracy}%
                </span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">🏅 Best finish</span>
                <span className="text-gray-200 font-semibold">1st</span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">📅 Most active</span>
                <span className="text-gray-200 font-semibold">Weekends</span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">🃏 Favorite deck</span>
                <span className="text-gray-200 font-semibold">Blitz Aggro</span>
              </div>
              <div className="h-px bg-gray-700" />
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">🌟 Titles earned</span>
                <span className="text-gray-200 font-semibold">
                  The Relentless
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Confirm Logout"
      >
        <div>
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded"
            >
              No
            </button>
            <button
              onClick={() => {
                handleLogout();
                setIsLogoutModalOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          {/* Username Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={user?.username || ""}
              disabled
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed opacity-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Username cannot be changed
            </p>
          </div>

          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={editFormData.phone}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  phone: e.target.value,
                })
              }
              placeholder="Enter phone number"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Country Field */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country
            </label>
            <select
              value={editFormData.country}
              onChange={(e) =>
                setEditFormData({ ...editFormData, country: e.target.value })
              }
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a country</option>
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code.toUpperCase()}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-700 text-gray-100 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-lg hover:opacity-90 transition font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage;
