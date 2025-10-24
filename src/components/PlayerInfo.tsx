import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlayerInfo = ({
  name,
  avatar,
  player_position,
  current_player_position,
  points,
  styles,
}: {
  name: string;
  avatar: string;
  player_position: number;
  current_player_position: number;
  points: number;
  styles: string;
}) => (
  <div
    className={`player-info absolute ${styles} mt- borde mb- w-fit mx-auto flex flex-col items-center`}
  >
    {player_position === current_player_position ? (
      <div className="border-2 sm:border-4 border-yellow-500 rounded-full animate-pulse">
        <Avatar className="w-12 h-12 avatar-image">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
      </div>
    ) : (
      <Avatar className="w-12 h-12 avatar-image">
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

export default PlayerInfo;
