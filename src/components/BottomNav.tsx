import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Medal, Trophy } from "lucide-react";

const navItems = [
  { label: "Home", to: "/", Icon: Home },
  { label: "Leaderboard", to: "/leaderboard", Icon: Medal },
  { label: "Tournaments", to: "/tournaments", Icon: Trophy },
];

const BottomNav: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-gray-900 border-t border-gray-800 fixed bottom-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-">
        <div className="grid grid-cols-3 gap-5 text-center">
          {navItems.map(({ label, to, Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={label}
                to={to}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-3 transition-all duration-150 ${
                  isActive
                    ? "text-green-500 shadow-[0_8px_24px_rgba(15,23,42,0.25)]"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-semibold">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
