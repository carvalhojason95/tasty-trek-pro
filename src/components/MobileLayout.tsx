import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, ClipboardList, User } from "lucide-react";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/restaurants", icon: Search, label: "Discover" },
  { path: "/tracking", icon: ClipboardList, label: "Orders" },
  { path: "/profile", icon: User, label: "Profile" },
];

const MobileLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-shell bg-background">
      <div className="pb-20 min-h-screen">
        {children}
      </div>
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center gap-0.5 px-4 py-1.5 transition-colors ${
                  isActive ? "text-accent" : "text-muted-foreground"
                }`}
              >
                <tab.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span className="text-[10px] font-body font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
