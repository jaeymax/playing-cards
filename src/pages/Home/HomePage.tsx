import React, { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import NavBar from "@/components/NavBar";
//import BottomNav from "@/components/BottomNav";
import TopPlayers from "./components/TopPlayers";
import RecentGames from "./components/RecentGames";
import InstallBanner from "./components/InstallBanner";
//import Announcements from "./components/Announcements";
import Footer from "@/components/Footer";
import TournamentBanner from "./components/TournamentBanner";
//import OnlineFriends from "./components/OnlineFriends";
// import RecentActivities from "./components/RecentActivities";
import WeeklySingleEliminationChampions from "./components/WeeklySingleEliminationChampions";
import OpenChallenges from "./components/OpenChallenges";
import { useAppContext } from "@/contexts/AppContext";
import OnlinePlayers from "./components/OnlinePlayers";
import WeeklySwissChampions from "./components/WeeklySwissChampions";
import NotificationPermissionModal from "./components/NotificationPermissionModal";
import { syncDevicePermission } from "@/utils/Functions";

const HomePage: React.FC = () => {
  const { user } = useAppContext();
  const canViewPlayerIds = [18, 48, 20];
  const canViewOpenChallenges = user && canViewPlayerIds.includes(user.id);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // useEffect(() => {
  //     if(!user || user.is_guest)return;

  //     try{
  //       const notificationPermission = Notification.permission === "default" ? "default" : Notification.permission === "granted" ? "granted" : "denied";
  //       alert(`Notification permission status: ${notificationPermission}`);
  //       if (Notification.permission === "default") {
  //       setShowNotificationModal(true);
  //     }

  //     }catch(e){
  //       console.error("Error checking notification permission:", e);
  //       const errMsg = e instanceof Error ? e.message : String(e);
  //       alert(errMsg);
  //     }

  //   }, [user]);

  useEffect(() => {
    if (!user || user.is_guest) return;

    //const browserPermission = Notification.permission;

    //alert(`browser permission: ${browserPermission}`)

    const checkNotifications = async () => {
      try {
        const device = await syncDevicePermission();

        if (!device) return;

        const browserPermission = Notification.permission;

        if (device.permission_status === "denied") return;
        if (device.permission_status === "granted" && device.token) return;
        // Device exists but browser hasn't
        // been granted permission yet.
        if (
          (browserPermission === "default" &&
            device.permission_status === "default") ||
          !device.token
        ) {
          setShowNotificationModal(true);
        }
      } catch (error) {
        console.error("Failed to check notification status:", error);
      }
    };

    checkNotifications();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-full flex flex-col">
      <InstallBanner />
      <NavBar showSignUps={true} />
      <div className="container mx-auto px-4 py-8 space-y-16 flex-1">
        {/* <TournamentBanner /> */}
        <HeroSection />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            {canViewOpenChallenges &&  <OnlinePlayers/>}
           
            {/* <OnlineFriends /> */}
            <TopPlayers />
            <WeeklySingleEliminationChampions />
            <WeeklySwissChampions />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-6 space-y-8">
            <TournamentBanner />
            <RecentGames />
            {/* <OpenChallenges/> */}
            {/* <RecentActivities /> */}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            {/* <Announcements /> */}
            {canViewOpenChallenges && <OpenChallenges />}
          </div>
        </div>
      </div>
      {/* <BottomNav /> */}
      <Footer />
      <NotificationPermissionModal
        open={showNotificationModal}
        onClose={() => setShowNotificationModal(false)}
      />
    </div>
  );
};

export default HomePage;
