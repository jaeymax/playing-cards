// import { useState, useEffect, useRef } from "react";
// import { Line } from "recharts";
// import {
//   LineChart,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   ReferenceLine,
//   Area,
//   AreaChart,
// } from "recharts";

// const PLAYER = {
//   username: "KingSlayer",
//   initials: "KS",
//   memberSince: "Jan 2023",
//   lastActive: "Today",
//   rating: 2847,
//   peakRating: 2901,
//   rank: "Grandmaster",
//   nextRank: "Mythic",
//   nextRankRating: 3000,
//   tournamentsPlayed: 134,
//   tournamentsWon: 41,
//   matchesPlayed: 1209,
//   matchWinRate: 58.2,
//   top3Finishes: 87,
//   bestStreak: 9,
//   currentStreak: 7,
//   globalPercentile: 1,
//   avgAccuracy: 82,
//   avgMoveSpeed: 4.2,
//   medals: { gold: 41, silver: 28, bronze: 18 },
//   skills: [
//     { label: "Aggression", value: 91, color: "#e8613a" },
//     { label: "Defense", value: 74, color: "#3b82f6" },
//     { label: "Consistency", value: 83, color: "#22c55e" },
//     { label: "Adaptability", value: 68, color: "#a78bfa" },
//     { label: "Clutch factor", value: 95, color: "#f59e0b" },
//   ],
//   ratingHistory: [
//     { t: "T1", rating: 2500, won: false },
//     { t: "T2", rating: 2534, won: true },
//     { t: "T3", rating: 2518, won: false },
//     { t: "T4", rating: 2570, won: true },
//     { t: "T5", rating: 2605, won: true },
//     { t: "T6", rating: 2648, won: true },
//     { t: "T7", rating: 2620, won: false },
//     { t: "T8", rating: 2700, won: true },
//     { t: "T9", rating: 2741, won: false },
//     { t: "T10", rating: 2789, won: true },
//     { t: "T11", rating: 2810, won: false },
//     { t: "T12", rating: 2847, won: true },
//   ],
// };

// const RANK_TIERS = [
//   { name: "Novice", min: 0, color: "#888" },
//   { name: "Apprentice", min: 1000, color: "#22c55e" },
//   { name: "Expert", min: 1500, color: "#3b82f6" },
//   { name: "Elite", min: 2000, color: "#a78bfa" },
//   { name: "Master", min: 2400, color: "#f59e0b" },
//   { name: "Grandmaster", min: 2700, color: "#e8613a" },
//   { name: "Mythic", min: 3000, color: "#ec4899" },
// ];

// function AnimatedNumber({ value, duration = 1200, format = (v) => v }) {
//   const [display, setDisplay] = useState(0);
//   const start = useRef(null);
//   const raf = useRef(null);

//   useEffect(() => {
//     start.current = null;
//     const animate = (ts) => {
//       if (!start.current) start.current = ts;
//       const progress = Math.min((ts - start.current) / duration, 1);
//       const ease = 1 - Math.pow(1 - progress, 3);
//       setDisplay(Math.round(ease * value));
//       if (progress < 1) raf.current = requestAnimationFrame(animate);
//     };
//     raf.current = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(raf.current);
//   }, [value, duration]);

//   return <span>{format(display)}</span>;
// }

// function StatCard({ icon, label, value, sub, accent }) {
//   return (
//     <div style={styles.statCard}>
//       <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
//         <span style={{ fontSize: 16, color: accent || "#a78bfa" }}>{icon}</span>
//         <span style={styles.statLabel}>{label}</span>
//       </div>
//       <div style={styles.statValue}>{value}</div>
//       {sub && <div style={styles.statSub}>{sub}</div>}
//     </div>
//   );
// }

// function MedalBadge({ emoji, count, label, bg, textColor }) {
//   return (
//     <div style={{ ...styles.medalCard, background: bg }}>
//       <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 4 }}>{emoji}</div>
//       <div style={{ fontSize: 24, fontWeight: 700, color: textColor, fontFamily: "'Playfair Display', serif" }}>
//         <AnimatedNumber value={count} duration={900} />
//       </div>
//       <div style={{ fontSize: 11, color: textColor, opacity: 0.7, marginTop: 2, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }}>
//         {label}
//       </div>
//     </div>
//   );
// }

// function SkillBar({ label, value, color, delay }) {
//   const [width, setWidth] = useState(0);
//   useEffect(() => {
//     const t = setTimeout(() => setWidth(value), 100 + delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);

//   return (
//     <div style={{ marginBottom: 12 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//         <span style={{ fontSize: 13, color: "#c4b9e8", fontWeight: 500 }}>{label}</span>
//         <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
//       </div>
//       <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
//         <div
//           style={{
//             height: "100%",
//             width: `${width}%`,
//             background: color,
//             borderRadius: 99,
//             transition: "width 0.9s cubic-bezier(0.34, 1.56, 0.64, 1)",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;
//   const d = payload[0];
//   const prev = PLAYER.ratingHistory.find((r) => r.t === label);
//   const idx = PLAYER.ratingHistory.findIndex((r) => r.t === label);
//   const delta = idx > 0 ? d.value - PLAYER.ratingHistory[idx - 1].rating : 0;
//   return (
//     <div style={styles.tooltip}>
//       <div style={{ fontSize: 12, color: "#c4b9e8", marginBottom: 4, fontWeight: 600 }}>{label}</div>
//       <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Playfair Display', serif" }}>
//         {d.value.toLocaleString()}
//       </div>
//       {delta !== 0 && (
//         <div style={{ fontSize: 12, color: delta > 0 ? "#4ade80" : "#f87171", marginTop: 2 }}>
//           {delta > 0 ? "▲" : "▼"} {Math.abs(delta)}
//         </div>
//       )}
//       {prev?.won && (
//         <div style={{ fontSize: 11, marginTop: 4, color: "#fbbf24" }}>🏆 Won this tournament</div>
//       )}
//     </div>
//   );
// };

// export default function SparProfile({ player = PLAYER }) {
//   const [visible, setVisible] = useState(false);
//   const ratingProgress = ((player.rating - 2700) / (3000 - 2700)) * 100;
//   const seasonDelta = player.rating - player.ratingHistory[0].rating;
//   const winRate = ((player.tournamentsWon / player.tournamentsPlayed) * 100).toFixed(1);
//   const podiumRate = ((player.top3Finishes / player.tournamentsPlayed) * 100).toFixed(1);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 50);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <div style={styles.root}>
//       <link
//         href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@400;500;600&display=swap"
//         rel="stylesheet"
//       />

//       {/* Background decoration */}
//       <div style={styles.bgOrb1} />
//       <div style={styles.bgOrb2} />

//       <div
//         style={{
//           ...styles.container,
//           opacity: visible ? 1 : 0,
//           transform: visible ? "translateY(0)" : "translateY(16px)",
//           transition: "opacity 0.5s ease, transform 0.5s ease",
//         }}
//       >
//         {/* ── Header ── */}
//         <div style={styles.header}>
//           <div style={styles.avatarWrap}>
//             <div style={styles.avatarRing} />
//             <div style={styles.avatar}>{player.initials}</div>
//             <div style={styles.onlineDot} />
//           </div>

//           <div style={{ flex: 1 }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
//               <h1 style={styles.username}>{player.username}</h1>
//               <span style={styles.rankBadge}>
//                 👑 {player.rank}
//               </span>
//             </div>
//             <p style={styles.meta}>
//               Member since {player.memberSince} · Last active {player.lastActive}
//             </p>

//             {/* Rating progress to next rank */}
//             <div style={{ marginTop: 10 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//                 <span style={{ fontSize: 12, color: "#a89cc8" }}>
//                   {player.rating.toLocaleString()} / {player.nextRankRating.toLocaleString()} → {player.nextRank}
//                 </span>
//                 <span style={{ fontSize: 12, color: "#e8613a", fontWeight: 600 }}>
//                   {player.nextRankRating - player.rating} pts to go
//                 </span>
//               </div>
//               <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden", maxWidth: 320 }}>
//                 <div
//                   style={{
//                     height: "100%",
//                     width: `${ratingProgress}%`,
//                     background: "linear-gradient(90deg, #7c3aed, #e8613a)",
//                     borderRadius: 99,
//                     transition: "width 1s ease 0.4s",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>

//           <div style={styles.ratingBlock}>
//             <div style={styles.ratingLabel}>RATING</div>
//             <div style={styles.ratingValue}>
//               <AnimatedNumber value={player.rating} duration={1400} format={(v) => v.toLocaleString()} />
//             </div>
//             <div style={{ fontSize: 11, color: "#a89cc8", marginTop: 2 }}>Peak {player.peakRating.toLocaleString()}</div>
//           </div>
//         </div>

//         {/* ── Stat Cards ── */}
//         <div style={styles.statsGrid}>
//           <StatCard icon="🏆" label="Tournaments won" value={<AnimatedNumber value={player.tournamentsWon} duration={1000} />} sub={`${winRate}% win rate`} accent="#fbbf24" />
//           <StatCard icon="🎮" label="Tournaments played" value={<AnimatedNumber value={player.tournamentsPlayed} duration={1000} />} sub="All time" accent="#a78bfa" />
//           <StatCard icon="⚔️" label="Matches played" value={<AnimatedNumber value={player.matchesPlayed} duration={1200} format={(v) => v.toLocaleString()} />} sub={`${player.matchWinRate}% match wins`} accent="#3b82f6" />
//           <StatCard icon="🎯" label="Podium finishes" value={<AnimatedNumber value={player.top3Finishes} duration={1000} />} sub={`${podiumRate}% podium rate`} accent="#22c55e" />
//           <StatCard icon="🔥" label="Current streak" value={`${player.currentStreak}W`} sub={`Best: ${player.bestStreak} wins`} accent="#e8613a" />
//           <StatCard icon="🌍" label="Global rank" value={`Top ${player.globalPercentile}%`} sub="Worldwide" accent="#f59e0b" />
//         </div>

//         {/* ── Medals ── */}
//         <div style={styles.sectionHeader}>
//           <span style={styles.sectionTitle}>Medal cabinet</span>
//           <span style={styles.sectionLine} />
//         </div>
//         <div style={styles.medalsGrid}>
//           <MedalBadge emoji="🥇" count={player.medals.gold} label="Gold" bg="rgba(251,191,36,0.12)" textColor="#fbbf24" />
//           <MedalBadge emoji="🥈" count={player.medals.silver} label="Silver" bg="rgba(148,163,184,0.12)" textColor="#cbd5e1" />
//           <MedalBadge emoji="🥉" count={player.medals.bronze} label="Bronze" bg="rgba(180,83,9,0.12)" textColor="#fb923c" />
//           <MedalBadge
//             emoji="🎖️"
//             count={player.medals.gold + player.medals.silver + player.medals.bronze}
//             label="Total"
//             bg="rgba(167,139,250,0.12)"
//             textColor="#a78bfa"
//           />
//         </div>

//         {/* ── Rating Chart ── */}
//         <div style={styles.sectionHeader}>
//           <span style={styles.sectionTitle}>Rating history</span>
//           <span style={styles.sectionLine} />
//           <span style={{ fontSize: 13, color: "#4ade80", fontWeight: 600, marginLeft: 10, whiteSpace: "nowrap" }}>
//             ▲ +{seasonDelta} this season
//           </span>
//         </div>
//         <div style={styles.chartCard}>
//           <ResponsiveContainer width="100%" height={220}>
//             <AreaChart data={player.ratingHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="ratingGrad" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.35} />
//                   <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <XAxis
//                 dataKey="t"
//                 tick={{ fill: "#7c6e9c", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <YAxis
//                 domain={["dataMin - 80", "dataMax + 40"]}
//                 tick={{ fill: "#7c6e9c", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
//                 axisLine={false}
//                 tickLine={false}
//                 tickFormatter={(v) => v.toLocaleString()}
//               />
//               <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(167,139,250,0.3)", strokeWidth: 1 }} />
//               <Area
//                 type="monotone"
//                 dataKey="rating"
//                 stroke="#a78bfa"
//                 strokeWidth={2.5}
//                 fill="url(#ratingGrad)"
//                 dot={(props) => {
//                   const d = player.ratingHistory[props.index];
//                   return (
//                     <circle
//                       key={props.index}
//                       cx={props.cx}
//                       cy={props.cy}
//                       r={d.won ? 6 : 4}
//                       fill={d.won ? "#fbbf24" : "#a78bfa"}
//                       stroke={d.won ? "#fbbf24" : "#1e1030"}
//                       strokeWidth={2}
//                     />
//                   );
//                 }}
//                 activeDot={{ r: 7, fill: "#a78bfa", stroke: "#fff", strokeWidth: 2 }}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//           <div style={{ display: "flex", gap: 16, marginTop: 8, paddingLeft: 4 }}>
//             <span style={styles.legendItem}>
//               <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fbbf24", display: "inline-block" }} />
//               Tournament win
//             </span>
//             <span style={styles.legendItem}>
//               <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a78bfa", display: "inline-block" }} />
//               Other result
//             </span>
//           </div>
//         </div>

//         {/* ── Skill Breakdown ── */}
//         <div style={styles.sectionHeader}>
//           <span style={styles.sectionTitle}>Skill breakdown</span>
//           <span style={styles.sectionLine} />
//         </div>
//         <div style={styles.bottomGrid}>
//           <div style={styles.skillCard}>
//             {player.skills.map((s, i) => (
//               <SkillBar key={s.label} label={s.label} value={s.value} color={s.color} delay={i * 80} />
//             ))}
//           </div>

//           {/* Quick facts */}
//           <div style={styles.factsCard}>
//             <div style={styles.factRow}>
//               <span style={styles.factLabel}>⚡ Avg. move speed</span>
//               <span style={styles.factValue}>{player.avgMoveSpeed}s</span>
//             </div>
//             <div style={styles.factDivider} />
//             <div style={styles.factRow}>
//               <span style={styles.factLabel}>🎯 Avg. accuracy</span>
//               <span style={styles.factValue}>{player.avgAccuracy}%</span>
//             </div>
//             <div style={styles.factDivider} />
//             <div style={styles.factRow}>
//               <span style={styles.factLabel}>🏅 Best finish</span>
//               <span style={styles.factValue}>1st</span>
//             </div>
//             <div style={styles.factDivider} />
//             <div style={styles.factRow}>
//               <span style={styles.factLabel}>📅 Most active</span>
//               <span style={styles.factValue}>Weekends</span>
//             </div>
//             <div style={styles.factDivider} />
//             <div style={styles.factRow}>
//               <span style={styles.factLabel}>🃏 Fav. deck</span>
//               <span style={styles.factValue}>Blitz Aggro</span>
//             </div>
//             <div style={styles.factDivider} />
//             <div style={styles.factRow}>
//               <span style={styles.factLabel}>🌟 Titles earned</span>
//               <span style={styles.factValue}>The Relentless</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   root: {
//     minHeight: "100vh",
//     background: "#0d0a1a",
//     position: "relative",
//     overflow: "hidden",
//     fontFamily: "'DM Sans', sans-serif",
//     padding: "2rem 1rem",
//   },
//   bgOrb1: {
//     position: "fixed",
//     top: -120,
//     right: -120,
//     width: 400,
//     height: 400,
//     borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%)",
//     pointerEvents: "none",
//   },
//   bgOrb2: {
//     position: "fixed",
//     bottom: -80,
//     left: -80,
//     width: 300,
//     height: 300,
//     borderRadius: "50%",
//     background: "radial-gradient(circle, rgba(232,97,58,0.12) 0%, transparent 70%)",
//     pointerEvents: "none",
//   },
//   container: {
//     maxWidth: 760,
//     margin: "0 auto",
//     position: "relative",
//     zIndex: 1,
//   },
//   header: {
//     display: "flex",
//     alignItems: "flex-start",
//     gap: 20,
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: 16,
//     padding: "1.25rem 1.5rem",
//     marginBottom: "1.25rem",
//     flexWrap: "wrap",
//   },
//   avatarWrap: { position: "relative", flexShrink: 0 },
//   avatarRing: {
//     position: "absolute",
//     inset: -3,
//     borderRadius: "50%",
//     background: "conic-gradient(from 180deg, #7c3aed, #e8613a, #fbbf24, #7c3aed)",
//     zIndex: 0,
//   },
//   avatar: {
//     position: "relative",
//     zIndex: 1,
//     width: 68,
//     height: 68,
//     borderRadius: "50%",
//     background: "#1e1030",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: 22,
//     fontWeight: 700,
//     color: "#c4b9e8",
//     fontFamily: "'Playfair Display', serif",
//     border: "3px solid #0d0a1a",
//   },
//   onlineDot: {
//     position: "absolute",
//     bottom: 3,
//     right: 3,
//     width: 12,
//     height: 12,
//     borderRadius: "50%",
//     background: "#4ade80",
//     border: "2px solid #0d0a1a",
//     zIndex: 2,
//   },
//   username: {
//     margin: 0,
//     fontSize: 26,
//     fontWeight: 700,
//     color: "#f0eaff",
//     fontFamily: "'Playfair Display', serif",
//     lineHeight: 1.1,
//   },
//   rankBadge: {
//     background: "rgba(232,97,58,0.15)",
//     border: "1px solid rgba(232,97,58,0.35)",
//     color: "#f97316",
//     fontSize: 12,
//     fontWeight: 600,
//     padding: "3px 10px",
//     borderRadius: 20,
//     letterSpacing: "0.03em",
//   },
//   meta: {
//     margin: "4px 0 0",
//     fontSize: 12,
//     color: "#7c6e9c",
//   },
//   ratingBlock: {
//     textAlign: "right",
//     flexShrink: 0,
//   },
//   ratingLabel: {
//     fontSize: 10,
//     fontWeight: 700,
//     color: "#7c6e9c",
//     letterSpacing: "0.1em",
//   },
//   ratingValue: {
//     fontSize: 38,
//     fontWeight: 700,
//     color: "#f0eaff",
//     fontFamily: "'Playfair Display', serif",
//     lineHeight: 1,
//     marginTop: 2,
//   },
//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
//     gap: 10,
//     marginBottom: "1.25rem",
//   },
//   statCard: {
//     background: "rgba(255,255,255,0.04)",
//     border: "1px solid rgba(255,255,255,0.07)",
//     borderRadius: 12,
//     padding: "14px 16px",
//   },
//   statLabel: { fontSize: 12, color: "#7c6e9c", fontWeight: 500 },
//   statValue: {
//     fontSize: 24,
//     fontWeight: 700,
//     color: "#f0eaff",
//     fontFamily: "'Playfair Display', serif",
//     margin: "2px 0 2px",
//   },
//   statSub: { fontSize: 11, color: "#5c5278" },
//   sectionHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: 10,
//     marginBottom: 12,
//     marginTop: 4,
//   },
//   sectionTitle: {
//     fontSize: 11,
//     fontWeight: 700,
//     color: "#7c6e9c",
//     letterSpacing: "0.1em",
//     textTransform: "uppercase",
//     whiteSpace: "nowrap",
//   },
//   sectionLine: {
//     flex: 1,
//     height: 1,
//     background: "rgba(255,255,255,0.06)",
//   },
//   medalsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(4, 1fr)",
//     gap: 10,
//     marginBottom: "1.25rem",
//   },
//   medalCard: {
//     borderRadius: 12,
//     padding: "14px 10px",
//     textAlign: "center",
//     border: "1px solid rgba(255,255,255,0.06)",
//   },
//   chartCard: {
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(255,255,255,0.07)",
//     borderRadius: 14,
//     padding: "1rem 1.25rem",
//     marginBottom: "1.25rem",
//   },
//   legendItem: {
//     display: "flex",
//     alignItems: "center",
//     gap: 6,
//     fontSize: 12,
//     color: "#7c6e9c",
//   },
//   bottomGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 12,
//     marginBottom: "1rem",
//   },
//   skillCard: {
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(255,255,255,0.07)",
//     borderRadius: 14,
//     padding: "1rem 1.25rem",
//   },
//   factsCard: {
//     background: "rgba(255,255,255,0.03)",
//     border: "1px solid rgba(255,255,255,0.07)",
//     borderRadius: 14,
//     padding: "1rem 1.25rem",
//   },
//   factRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "7px 0",
//   },
//   factLabel: { fontSize: 13, color: "#7c6e9c" },
//   factValue: { fontSize: 13, fontWeight: 600, color: "#c4b9e8" },
//   factDivider: { height: 1, background: "rgba(255,255,255,0.05)" },
//   tooltip: {
//     background: "#1e1030",
//     border: "1px solid rgba(167,139,250,0.25)",
//     borderRadius: 10,
//     padding: "10px 14px",
//     fontSize: 13,
//   },
// };