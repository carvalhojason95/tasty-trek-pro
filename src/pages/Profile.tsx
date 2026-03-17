import { ArrowLeft, ChevronRight, LogOut, User, Clock, Heart, CreditCard, HelpCircle, Leaf, Users, CalendarClock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pastOrders } from "@/data/mockData";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Clock, label: "Order History", action: () => {} },
    { icon: Heart, label: "Favorites", action: () => {} },
    { icon: CreditCard, label: "Payment Methods", action: () => {} },
    { icon: CalendarClock, label: "Scheduled Orders", action: () => {} },
    { icon: Users, label: "Group Orders", action: () => {} },
    { icon: Leaf, label: "Eco Preferences", action: () => {} },
    { icon: HelpCircle, label: "Help & Support", action: () => navigate("/support") },
  ];

  return (
    <div className="px-5 pt-12 pb-6">
      <h1 className="font-heading text-lg font-bold mb-6">Profile</h1>

      {/* User Card */}
      <div className="bg-card rounded-lg p-4 border border-border flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center">
          <User size={24} className="text-accent" />
        </div>
        <div className="flex-1">
          <p className="font-heading text-base font-bold">Alex Johnson</p>
          <p className="font-body text-xs text-muted-foreground">alex.j@email.com</p>
        </div>
        <span className="bg-success/10 text-success text-[10px] font-heading font-bold px-2 py-0.5 rounded-full">
          Gold
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="font-heading text-lg font-bold text-accent">24</p>
          <p className="font-body text-[10px] text-muted-foreground">Orders</p>
        </div>
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="font-heading text-lg font-bold text-accent">5</p>
          <p className="font-body text-[10px] text-muted-foreground">Favorites</p>
        </div>
        <div className="bg-card rounded-lg p-3 border border-border text-center">
          <p className="font-heading text-lg font-bold text-success">$12</p>
          <p className="font-body text-[10px] text-muted-foreground">Saved</p>
        </div>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-0.5 mb-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="flex items-center justify-between py-3 px-1 active:bg-secondary rounded-md transition-colors"
          >
            <div className="flex items-center gap-3">
              <item.icon size={18} className="text-muted-foreground" />
              <span className="font-body text-sm">{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </button>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="font-heading text-base font-bold mb-3">Recent Orders</h2>
      <div className="flex flex-col gap-3 mb-6">
        {pastOrders.map((order) => (
          <div key={order.id} className="flex items-center gap-3 bg-card rounded-lg p-3 border border-border">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img src={order.image} alt={order.dishName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-xs font-bold truncate">{order.dishName}</p>
              <p className="font-body text-[10px] text-muted-foreground">{order.restaurantName}</p>
            </div>
            <div className="text-right">
              <span className="font-heading text-xs font-bold">₹{order.price.toFixed(2)}</span>
              <button className="block font-body text-[10px] text-accent font-bold mt-0.5">Reorder</button>
            </div>
          </div>
        ))}
      </div>

      <button className="flex items-center gap-2 text-destructive font-body text-sm mb-8">
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Profile;
