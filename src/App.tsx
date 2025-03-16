import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./MainPage";
//import Leaderboard from "./pages/Leaderboard";
//import LeaderboardPage from "./pages/tests/Leaderboard";
import LeaderboardPage from "./pages/Leaderboard/LeaderboardPage";
import Play from "./pages/Play";
//import Support from "./pages/Support";
import SupportPage from "./pages/tests/Support";
//import Profile from "./pages/Profile";
import Profile from "./pages/tests/Profile";
import Deposit from "./pages/Deposit";
import { useAppContext } from "./contexts/AppContext";
import PlayTest from "./pages/PlayTest";
import MailPage from "./pages/Mail";
//import NotificationsPage from "./pages/Notifications";
import FriendsPage from "./pages/tests/Friends";
import { Toaster } from "./components/ui/toaster";
import SignupFlow from "./pages/SignupFlow";
import SignupForm from "./pages/SignupForm";
import NotificationsPage from "./pages/tests/Notifications";
import EventsPage from "./pages/tests/Events";
import DashboardPage from "./pages/admin/Dashboard";
import SettingsPage from "./pages/tests/Settings";
// import TournamentsPage from "./pages/tests/Tournaments";
import TournamentPage from "./pages/Tournament/TournamentPage";
import AboutPage from "./pages/About/AboutPage";
import HelpPage from "./pages/tests/Help";
import RulesPage from "./pages/tests/Rules";
import GamePage from "./pages/GamePage/GamePage";
import GlobalChat from "./pages/GlobalChat/GlobalChat";
import SignInPage from "./pages/tests/Signin";
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/Home/HomePage";
import TermsOfService from "./pages/Legal/TermsOfService";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import ContactPage from "./pages/Support/ContactPage";

function App() {
  const { overlay } = useAppContext();

  return (
    <div
      className={`bg-[url(./assets/bglarge.jp)] relative bg-cover bg-center bg-gray-900 w-full  min-h-screen flex flex-col`}
    >
      {overlay && (
        <div className={`overlay absolute top-0 left-0 right-0 bottom-0`}></div>
      )}

      <BrowserRouter>
        {/* <Navbar user = {false}  /> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/play" element={<PlayTest />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/mail" element={<MailPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* <Route path="/tournaments" element={<TournamentsPage />} /> */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/chat" element={<GlobalChat />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path = '/home' element = {<HomePage />} />
          <Route path = '/tournament' element = {<TournamentPage/>} />
          <Route path = '/terms-of-service' element = {<TermsOfService/>} />
          <Route path = '/privacy-policy' element = {<PrivacyPolicy/>} />
          <Route path = '/contact' element = {<ContactPage/>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
