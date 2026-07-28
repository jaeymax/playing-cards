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
  tournament_id:number;
  rating_after: number;
  rating_before:number;
  rating_change:number;
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
      (division) =>
        rating >= division.min && rating <= division.max
    ) || divisions[0]
  );
};

export default function RatingGraph({
  history,
}: RatingGraphProps) {
  if (!history || !history.length) return null;
  console.log('history', history);

  const latestRating =
    history[history.length - 1].rating_after;

  const currentDivision = getDivision(latestRating);

  (currentDivision && true)

  return (
    <div className="w-full h-[300px] md:h-[450px] rounded-lg border border-gray-700 bg-gray-800 p-4">
      
      <ResponsiveContainer  width="100%" height="100%">
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
              fillOpacity={0.08}
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

          <CartesianGrid
            stroke="#374151"
            strokeOpacity={0.3}
          />

          <XAxis
            dataKey="tournament_id"
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF", fontSize:11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            domain={[0, 3000]}
            ticks={divisions.map((d) => d.min)}
            stroke="#9CA3AF"
            tick={{ fill: "#9CA3AF", fontSize:11 }}
            axisLine={false}
            tickLine={false}
             tickFormatter={(v) => v.toLocaleString()}
          />

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

              return [
                `${value} (${division.name})`,
                "Rating",
              ];
            }}
          />

          {/* Rating Line */}
          <Line
            type="monotone"
            dataKey="rating_after"
            stroke={"#fbbf24"}
            strokeWidth={3}
            dot={{
              r: 4,
            }}
            activeDot={{
              r: 7,
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
    </div>
  );
}