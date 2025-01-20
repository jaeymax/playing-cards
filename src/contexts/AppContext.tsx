import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  username: string;
  email: string;
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
  updateUser: (user: User) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignUpOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [overlay, setOverlay] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      updateOverlay(!prev);
      return !prev;
    });
  };

  const updateUser = (user: User) => {
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
