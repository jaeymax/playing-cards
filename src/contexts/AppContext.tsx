import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppState {
  sidebarOpen: boolean;
  activeTab: string;
  loginOpen:boolean;
  signupOpen:boolean;
  overlay:boolean;
  toggleSidebar: () => void;
  setActiveTabState: (tab: string) => void;
  updateLoginOpen:(value:boolean) => void;
  updateSignupOpen:(value:boolean) => void;
  updateOverlay:(value:boolean)=>void;
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

  const toggleSidebar = () => {
    setSidebarOpen((prev) => {
      updateOverlay(!prev);
      return !prev
    }
  )
  
  }

  const updateLoginOpen = (state:boolean) =>{
    setLoginOpen(state);
    updateOverlay(state);
  }

  const updateOverlay = (value:boolean) =>{
    setOverlay(value);
  }

  const updateSignupOpen = (state:boolean) =>{
    setSignUpOpen(state);
    updateOverlay(state);
  }

  const setActiveTabState = (tab: string) => setActiveTab(tab);

  return (
    <AppContext.Provider
      value={{ sidebarOpen,loginOpen, updateOverlay,overlay, updateLoginOpen,updateSignupOpen, signupOpen, activeTab, toggleSidebar, setActiveTabState }}
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
