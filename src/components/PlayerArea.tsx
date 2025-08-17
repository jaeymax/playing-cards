import React from "react";

interface PlayerAreaProps {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
  className: string;
  numSlots?: number;
}

const PlayerArea = React.forwardRef<
  HTMLDivElement,
  PlayerAreaProps
>(({ id, className, numSlots = 5 }, ref) => {
  return (
    <div id={id} ref={ref} className={className}>
      {[...Array(numSlots)].map((_, index) => (
        <div key={index} className="card-slot" data-position={index}></div>
      ))}
    </div>
  );
});

PlayerArea.displayName = "PlayerArea";

export default PlayerArea;
