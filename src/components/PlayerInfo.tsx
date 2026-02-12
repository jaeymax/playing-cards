import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlayerInfo = ({
  name,
  avatar,
  player_position,
  current_player_position,
  points,
  remaining_time = 60,
  total_time = 60,
  styles,
}: {
  name: string;
  avatar: string;
  player_position: number;
  current_player_position: number;
  points: number;
  remaining_time?:number,
  total_time?:number,
  styles: string;
}) => {
  //const RADIUS = 16;
  const STROKE = 8;
  //const CIRCUMFERENCE = 2 * Math.PI * RADIUS;


  const progress = remaining_time / total_time;
  //const dashOffset = CIRCUMFERENCE * (1 - progress);

  

  return (
    <div
      className={`player-info absolute ${styles}  borde mb- w-fit mx-auto flex flex-col items-center`}
    >
      {player_position === current_player_position ? (
        <div className="relative flex items-center justify-center animate-pulse">
          {/* SMALL SCREENS */}
          <svg
            className="absolute block md:hidden -rotate-90"
            width="40"
            height="40"
          >
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="transparent"
              stroke={`${remaining_time <=5?"#ef4444":"#eab308" }`}
              strokeWidth={STROKE}
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 16}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-1000 linear"
            />
          </svg>

          {/* MEDIUM+ SCREENS */}
          <svg
            className="absolute hidden md:block -rotate-90"
            width="64"
            height="64"
          >
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="transparent"
              stroke={`${remaining_time <=5?"#ef4444":"#eab308" }`}
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={(1 - progress) * 2 * Math.PI * 26}
              strokeLinecap="round"
              className="transition-[stroke-dashoffset] duration-1000 linear"
            />
          </svg>

          {/* Avatar */}
          <Avatar className="md:w-12 md:h-12 w-8 h-8 avatar-image">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <Avatar className="md:w-12 md:h-12 w-8 h-8 avatar-image">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      )}
      <div className="text-center">
        <div className="font-medium player-name">{name}</div>
        <div className="text-sm font-semibold player-score">{points} pts</div>
      </div>
    </div>
  );
};

export default PlayerInfo;
