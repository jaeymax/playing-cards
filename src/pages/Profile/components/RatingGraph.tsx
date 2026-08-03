import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceArea,
  // ReferenceLine,
} from "recharts";

interface RatingPoint {
  tournament_id: number;
  rating_after: number;
  rating_before: number;
  rating_change: number;
  name: string;
  won: boolean;
  start_date: string;
}

interface RatingGraphProps {
  history: RatingPoint[];
}

const divisions = [
  {
    name: "Rookie",
    min: 0,
    max: 1199,
    color: "#9CA3AF",
  },
  {
    name: "Contender",
    min: 1200,
    max: 1399,
    color: "#22C55E",
  },
  {
    name: "Strategist",
    min: 1400,
    max: 1599,
    color: "#06B6D4",
  },
  {
    name: "Expert",
    min: 1600,
    max: 1799,
    color: "#3B82F6",
  },
  {
    name: "Master",
    min: 1800,
    max: 1999,
    color: "#8B5CF6",
  },
  {
    name: "Grandmaster",
    min: 2000,
    max: 2199,
    color: "#F97316",
  },
  {
    name: "Legend",
    min: 2200,
    max: 2399,
    color: "#EF4444",
  },
  {
    name: "Spar God",
    min: 2400,
    max: 3000,
    color: "#FBBF24",
  },
];

const getDivision = (rating: number) => {
  return (
    divisions.find(
      (division) => rating >= division.min && rating <= division.max,
    ) || divisions[0]
  );
};

export default function RatingGraph({ history }: RatingGraphProps) {
  if (!history || !history.length) return null;
  console.log("history", history);

  const latestRating = history[history.length - 1].rating_after;

  const currentDivision = getDivision(latestRating);

  currentDivision && true;

  return (
    <div className="w-full h-[500px] rounded-lg border border-gray-700 relative bg-gray-800/40 p-4 ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={history}
          margin={{
            top: 20,
            right: 20,
            left: 10,
            bottom: 10,
          }}
        >
          {/* Division Backgrounds */}
          {divisions.map((division) => (
            <ReferenceArea
              key={division.name}
              y1={division.min}
              y2={division.max}
              fill={division.color}
              fillOpacity={0.4}
            />
          ))}

          {/* Division Threshold Lines */}
          {/* {divisions.map((division) => (
            <ReferenceLine
              key={`${division.name}-line`}
              y={division.min}
              stroke={division.color}
              strokeOpacity={0.4}
              strokeDasharray="4 4"
            />
          ))} */}

          <CartesianGrid stroke="#374151" strokeOpacity={0.3} />

          <XAxis
            dataKey="tournament_id"
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 3000]}
            ticks={[...divisions.map((d) => d.min), divisions[divisions.length - 1].max]}
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => v.toLocaleString()}
          />
          {/* 
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "11px",
            }}
            formatter={(value: any) => {
              const division = getDivision(value);

              return [`${value} (${division.name})`, "Rating"];
            }}
          /> */}
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;

              const point = payload[0].payload;

              return (
                <div className="rounded-xl border border-gray-700 bg-gray-900 p-3 shadow-xl">
                  <div className="font-semibold text-white text-xs">
                    Rating: {point.rating_after}
                  </div>
                  <div
                    className={
                      point.won
                        ? "text-amber-400 font-medium text-xs"
                        : "text-gray-300 text-xs"
                    }
                  >
                    {point.won ? "🏆 Tournament Winner" : "Participant"}
                  </div>
                  <div
                    className={
                      point.rating_change >= 0
                        ? "text-green-400 text-xs"
                        : "text-red-400 text-xs"
                    }
                  >
                    {point.rating_change >= 0 ? "+" : ""}
                    {point.rating_change}
                  </div>

                  {/* Tournament Name */}
                  <div className="font-semibold text-xs text-white">
                    {point.name}
                  </div>

                  {/* Tournament Date */}
                  <div className="mt-2 border-t border-gray-700 pt-2 text-xs text-gray-400">
                    {new Date(point.start_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true, // Set to
                    })}
                  </div>
                </div>
              );
            }}
          />

          {/* Rating Line */}
          <Line
            type="monotone"
            dataKey="rating_after"
            stroke={"#fbbf24"}
            strokeWidth={3}
            // dot={{
            //   r: 4,
            // }}
            activeDot={{
              r: 8,
              stroke: "#fff",
              strokeWidth: 3,
              fill: "#fbbf24",
            }}
            dot={(props) => {
              const d = history[props.index];

              if (d.won) {
                return (
                  <rect
                    x={(props.cx as number) - 5}
                    y={(props.cy as number) - 5}
                    width={10}
                    height={10}
                    transform={`rotate(45 ${props.cx} ${props.cy})`}
                    fill="#fbbf24"
                    stroke="#fff"
                    strokeWidth={2}
                  />
                );
              }

              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={5}
                  fill={d.rating_change >= 0 ? "#22c55e" : "#ef4444"}
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }}
          />

          {/* Current Rating Marker */}
          {/* <ReferenceLine
            y={latestRating}
            stroke={currentDivision.color}
            strokeWidth={2}
          /> */}
        </LineChart>
      </ResponsiveContainer>

      <div className="flex gap-4 mt-4 px-1 absolute bottom-2 left-1">
        <span className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rotate-45 bg-yellow-400" />
          Tournament win
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Rating Gained
        </span>
        <span className="flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          Rating Lost
        </span>
      </div>
    </div>
  );
}
