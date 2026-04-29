import React from "react";

interface OpponentAreaProps {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
  className: string;
  numSlots?: number;
}

const OpponentArea = React.forwardRef<
  HTMLDivElement,
  OpponentAreaProps
>(({ id, className, numSlots = 5 }, ref) => {
  return (
    <div id={id} ref={ref} className={className}>
      {[...Array(numSlots)].map((_, index) => (
        <div key={index} className="card-slot" data-position={index}></div>
      ))}
    </div>
  );
});

OpponentArea.displayName = "OpponentArea";

export default OpponentArea;
