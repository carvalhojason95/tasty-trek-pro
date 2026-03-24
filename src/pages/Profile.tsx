import { ChevronRight, LogOut, User, Clock, Heart, CreditCard, HelpCircle, Leaf, Users, CalendarClock, Settings, Bell, ChevronDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pastOrders, restaurants } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

const Profile = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const menuItems = [
    { icon: Clock, label: "Order History", desc: "View all past orders", action: () => navigate("/order-history"), color: "text-accent" },
    { icon: Heart, label: "Favorites", desc: "Your saved restaurants", action: () => navigate("/favorites"), color: "text-destructive" },
    { icon: CreditCard, label: "Payment Methods", desc: "Manage cards & wallets", action: () => navigate("/payment-methods"), color: "text-warning" },
    { icon: CalendarClock, label: "Scheduled Orders", desc: "Upcoming scheduled meals", action: () => navigate("/scheduled-orders"), color: "text-accent" },
    { icon: Users, label: "Group Orders", desc: "Order with friends", action: () => navigate("/group-orders"), color: "text-primary" },
    { icon: Leaf, label: "Eco Preferences", desc: "Go green with every order", action: () => navigate("/eco-preferences"), color: "text-success" },
    { icon: HelpCircle, label: "Help & Support", desc: "Get help with issues", action: () => navigate("/support"), color: "text-muted-foreground" },
  ];

  const handleReorder = (order: typeof pastOrders[0]) => {
    const restaurant = restaurants.find(r => r.id === order.restaurantId);
    if (restaurant) {
      const menuItem = restaurant.menu.find(m => m.name === order.dishName);
      if (menuItem) {
        addItem({ ...menuItem, quantity: 1, restaurantName: restaurant.name, restaurantId: restaurant.id });
        navigate("/cart");
      }
    }
  };

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-lg font-bold">Profile</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-secondary text-muted-foreground">
            <Bell size={18} />
          </button>
          <button className="p-2 rounded-full bg-secondary text-muted-foreground">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* User Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-accent/10 via-card to-card rounded-2xl p-5 border border-accent/15 shadow-sm mb-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-warning flex items-center justify-center shadow-md">
            <User size={28} className="text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-heading text-base font-bold">Alex Johnson</p>
            <p className="font-body text-xs text-muted-foreground">alex.j@email.com</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="bg-gradient-to-r from-warning to-accent text-accent-foreground text-[10px] font-heading font-bold px-3 py-0.5 rounded-full shadow-sm">
                ⭐ Gold Member
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {[
          { value: "24", label: "Orders", color: "text-accent" },
          { value: "5", label: "Favorites", color: "text-destructive" },
          { value: "$12", label: "Saved", color: "text-success" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 border border-border text-center shadow-sm">
            <p className={`font-heading text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="font-body text-[10px] text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Menu */}
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden mb-6">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.03 }}
            onClick={item.action}
            className="w-full flex items-center justify-between py-3.5 px-4 active:bg-secondary transition-colors border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-secondary flex items-center justify-center ${item.color}`}>
                <item.icon size={16} />
              </div>
              <div className="text-left">
                <span className="font-heading text-sm font-bold block">{item.label}</span>
                <span className="font-body text-[10px] text-muted-foreground">{item.desc}</span>
              </div>
            </div>
            <ChevronRight size={16} className="text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Recent Orders */}
      <h2 className="font-heading text-base font-bold mb-3">Recent Orders</h2>
      <div className="flex flex-col gap-3 mb-6">
        {pastOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.04 }}
            className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border shadow-sm"
          >
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
              <img src={order.image} alt={order.dishName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-xs font-bold truncate">{order.dishName}</p>
              <p className="font-body text-[10px] text-muted-foreground">{order.restaurantName}</p>
            </div>
            <div className="text-right">
              <span className="font-heading text-xs font-bold">${order.price.toFixed(2)}</span>
              <button
                onClick={() => handleReorder(order)}
                className="block font-heading text-[10px] text-accent-foreground bg-accent px-2.5 py-1 rounded-md mt-1"
              >
                Reorder
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <button className="flex items-center gap-2 text-destructive font-body text-sm mb-8 opacity-70 hover:opacity-100 transition-opacity">
        <LogOut size={16} />
        <span>Sign Out</span>
      </button>
    </div>
  );
};

export default Profile;
