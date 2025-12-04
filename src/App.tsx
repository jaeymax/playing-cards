import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import HomePage from "./pages/Home/HomePage";
import SupportPage from "./pages/tests/Support";
import ProfilePage from "./pages/Profile/ProfilePage";
import { useAppContext } from "./contexts/AppContext";
import FriendsPage from "./pages/Friends/FriendsPage";
import { Toaster } from "./components/ui/toaster";
import NotificationsPage from "./pages/tests/Notifications";
import EventsPage from "./pages/tests/Events";
import DashboardPage from "./pages/admin/DashboardPage";
import SettingsPage from "./pages/tests/Settings";
import TournamentPage from "./pages/Tournament/TournamentPage";
import AboutPage from "./pages/About/AboutPage";
import HelpPage from "./pages/tests/Help";
import RulesPage from "./pages/tests/Rules";
import GlobalChat from "./pages/GlobalChat/GlobalChat";
import SignInPage from "./pages/tests/Signin";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SignUp from "./pages/SignUp/SignUp";
import TermsOfService from "./pages/Legal/TermsOfService";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import ContactPage from "./pages/Support/ContactPage";
import TournamentsPage from "./pages/Tournaments/TournamentsPage";
import FAQ from "./pages/FAQ/FAQ";
import TeamPage from "./pages/About/TeamPage";
import CareersPage from "./pages/About/CareersPage";
import RecentGamesPage from "./pages/RecentGames/RecentGamesPage";
import GameDetailsPage from "./pages/GameDetails/GameDetailsPage";
import AnnouncementsPage from "./pages/Announcements/AnnouncementsPage";
import RecentActivitiesPage from "./pages/Activities/RecentActivitiesPage";
import ConnectionStatusIndicator from "./components/ConnectionStatusIndicator";
import GameModal from "./components/GameModal";


//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";
import { useEffect } from "react";
import { analytics, logEvent } from "./firebase/config";
import TournamentLobby from "./pages/TournamentLobby/TournamentLobby";
import TournamentDetailsPage from "./pages/Tournaments/TournamentDetailsPage";
import PrivateRoute from "./components/PrivateRoute";
//import AboutPage from "./pages/About/AboutPage";

// Create an instance of the Mixpanel object, your token is already added to this snippet
mixpanel.init(import.meta.env.VITE_APP_MIXPANEL_TOKEN, {
  autocapture: true,
  record_sessions_percent: 100,
})




function App() {
  const { overlay, user } = useAppContext();

  useEffect(() => {
    logEvent(analytics, 'app_open');
  }, []);


  return (
    <div
      className={
        "relative bg-cover bg-center bg-gray-900 w-full  min-h-screen flex flex-col"
      }
    >
      {overlay && (
        <div className={`overlay absolute top-0 left-0 right-0 bottom-0`}></div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/game/:code" element={<GameModal />} />
          <Route path="/support" element={<SupportPage />} />
          <Route element={<PrivateRoute />}>
            {/* Protected routes go here */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          </Route>
          <Route path="/events" element={<EventsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/tournaments" element={<TournamentsPage />} />
          <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
          <Route path="/tournament-lobby" element={<TournamentLobby />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/chat" element={<GlobalChat />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tournaments/lobby/:id" element={<TournamentPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/recent-games" element={<RecentGamesPage />} />
          <Route path="/game-details/:id" element={<GameDetailsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/activities" element={<RecentActivitiesPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      {user && <ConnectionStatusIndicator />}
    </div>
  );
}

export default App;
