import { FC } from "react";

interface PlayOptionItemProps {
  imageUrl: string;
  playOption: string;
  index:number;
}

// bg-[#81b64c]

const PlayOptionItem: FC<PlayOptionItemProps> = ({ imageUrl, playOption, index }) => {
  return (
    <div className={`${index == 0?'bg-[#81b64c] hover:bg-[#90bd63]':'bg-[#FFFFFF1A] hover:bg-[#ffffff27]'} flex gap-3 items-center p-2 uppercase cursor-pointer font-medium w-full rounded-sm`}>
      <div className="w-10 h-10">
        <img className="w-full h-full object-contain" src={imageUrl} alt="" />
      </div>
      {playOption}
    </div>
  );
};

export default PlayOptionItem;
