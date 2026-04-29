import React from "react";

interface SidePanelProps {
  children: React.ReactNode;
}

const SidePanel = ({ children }: SidePanelProps) => {
  return (
    <div className="bg-black bg-opacity-60 text-white rounded-lg p-4 space-y-4 h-full">
      {children}
    </div>
  );
};

export default SidePanel;
