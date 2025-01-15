import React, { createContext, ReactNode, useContext, useState } from "react";

interface AppState {
  sidebarOpen: boolean;
  activeTab: string;
  toggleSidebar: () => void;
  setActiveTabState: (tab: string) => void;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const setActiveTabState = (tab: string) => setActiveTab(tab);

  return (
    <AppContext.Provider
      value={{ sidebarOpen, activeTab, toggleSidebar, setActiveTabState }}
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
