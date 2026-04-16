import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

import { baseUrl } from "@/config/api";
import { authHeaders, customLog, getToken, removeToken } from "@/utils/Functions";
import mixpanel from "mixpanel-browser";

interface User {
  username: string;
  email: string;
  image_url: string;
  games_played:number;
  games_won:number;
  is_rated:boolean;
  tournaments_played:number;
  tournaments_won:number;
  balance:string;
  rank:number;
  is_guest:boolean;
  rating:number;
  location:string;
  created_at:string;
  updated_at:string;
  id:number;
  role:string;
  bio:string;
  phone:string;
  dob:string;
}

interface AppState {
  sidebarOpen: boolean;
  activeTab: string;
  loginOpen: boolean;
  signupOpen: boolean;
  overlay: boolean;
  user: User | null;
  toggleSidebar: () => void;
  setActiveTabState: (tab: string) => void;
  updateLoginOpen: (value: boolean) => void;
  updateSignupOpen: (value: boolean) => void;
  updateOverlay: (value: boolean) => void;
  updateUser: (user: User | null) => void;
  isLoading: boolean;
  notifications: Notification[];
  notificationsError: string | null;
  notificationsLoading: boolean;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
}

interface AppProviderProps {
  children: ReactNode;
}

interface Notification {
  id: number;
  type: string;
  is_read: boolean;
  title: string;
  message: string;
  created_at: string;
  action: string;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignUpOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [overlay, setOverlay] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsError, setNotificationsError] = useState<string|null>(null);
  const [notificationsLoading, setNotificationsLoading] = useState(false);

  customLog("User in context:", user);

  useEffect(() => {
      if (!user) return;
      // Simulate fetching notifications from an API
      const fetchNotifications = async () => {
        // Replace this with actual API call
        setNotificationsLoading(true);
        setNotificationsError(null);
        try{
          const fetchedNotifications = await fetch(`${baseUrl}/notifications/user/${user?.id}`,  {
            method: "GET",
            headers: {
              "Content-Type": "application/json", 
              ...authHeaders()
            },
          });
          if(!fetchedNotifications.ok){
              throw new Error(
                fetchedNotifications.status === 500 ? "Network error. Please check your internet connection":"Failed to fetch notifications"
              )
          }

        const data = await fetchedNotifications.json();

          setNotifications(data);
        }catch(err:any){
            console.log(err, "Error fetching notifications");
            setNotificationsError(err.message || "An error occured. Please try again")
        }finally{
          setNotificationsLoading(false);
        }
      };

  
      fetchNotifications();
    }, [user]);



    
  useEffect(() => {
    const accessToken = getToken();
    
    if (accessToken && !user) {
      setIsLoading(true);
      fetch(`${baseUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          
         // if (!response.ok) throw new Error("Failed to fetch user data");

          if(response.status === 401 || response.status === 403){
            removeToken();
            throw new Error("Unauthorized");
          }
          return response.json();
        })
        .then((userData) => {
         
          
          setUser(userData);
          mixpanel.identify(userData.id);
          mixpanel.people.set({
            $email: userData.email, // only if you have it
            $created: new Date(userData.created_at), // only if you have it
            username: userData.username,
            games_played: userData.games_played,
      
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
         // removeToken();
          //sessionStorage.removeItem("accessToken"); // Clear invalid token
        })
        .finally(() => {
          setIsLoading(false);
          
        });
    }
  }, [user]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      updateOverlay(!prev);
      return !prev;
    });
  };

  const updateUser = (user: User | null) => {
    setUser(user);
  };

  const updateLoginOpen = (state: boolean) => {
    setLoginOpen(state);
    updateOverlay(state);
  };

  const updateOverlay = (value: boolean) => {
    setOverlay(value);
  };

  const updateSignupOpen = (state: boolean) => {
    setSignUpOpen(state);
    updateOverlay(state);
  };

  const setActiveTabState = (tab: string) => setActiveTab(tab);

  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        loginOpen,
        user,
        updateUser,
        updateOverlay,
        overlay,
        updateLoginOpen,
        updateSignupOpen,
        signupOpen,
        activeTab,
        toggleSidebar,
        setActiveTabState,
        isLoading,
        notifications,
        setNotifications,
        notificationsError,
        notificationsLoading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppState => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be within an AppProvider");
  return context;
};
