import React from "react";

interface MainLayoutProps {
  gameBoard: React.ReactNode;
  sidePanel: React.ReactNode;
}

const MainLayout = ({ gameBoard, sidePanel }: MainLayoutProps) => {
  return (
    <div className="flex gap-4 borde border-red-500 p-4 min-h-[calc(100vh-80px)]">
      <div className="flex-1">{gameBoard}</div>
      <div className="w-80 hidden lg:block">{sidePanel}</div>
    </div>
  );
};

export default MainLayout;
