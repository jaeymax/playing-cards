import React from "react";
import HeroSection from "./components/HeroSection";
import NavBar from "@/components/NavBar";
import TopPlayers from "./components/TopPlayers";
import RecentGames from "./components/RecentGames";
//import Announcements from "./components/Announcements";
import Footer from "@/components/Footer";
const HomePage: React.FC = () => {


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-full">
      <NavBar />
      <div className="container mx-auto px-4 py-8 space-y-16">
        <HeroSection />

         {/* Main Grid Layout */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <TopPlayers />
          {/*  <OnlineFriends /> */}
           </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-8">
            {/* <TournamentBanner /> */}
            <RecentGames />
            {/* <RecentActivities /> */}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3">
            {/* <Announcements /> */}
          </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
