import React from "react";

interface MainLayoutProps {
  gameBoard: React.ReactNode;
  sidePanel: React.ReactNode;
}

const MainLayout = ({ gameBoard, sidePanel }: MainLayoutProps) => {
  return (
    <main className="flex-1 min-h-0 px-2 pb-2 sm:px-4 sm:pb-4">
      <div className="mx-auto flex h-full min-h-[calc(100vh-120px)] max-w-7xl gap-4 lg:min-h-[calc(100vh-150px)]">
        
        {/* Game Board */}
        <section className="relative min-w-0 flex-1 overflow-hidden rounded-2xl borde borderwhite/10 bgblack/10 shadowxl backdro-blur-[2px]">
          {gameBoard}
        </section>

        {/* Match Information */}
        <aside className="hidden w-72 shrink-0 xl:block">
          {sidePanel}
        </aside>

        {/* Tablet / Small Desktop */}
        <aside className="hidden w-64 shrink-0 lg:block xl:hidden">
          {sidePanel}
        </aside>
      </div>
    </main>
  );
};

export default MainLayout;
