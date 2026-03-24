import { ArrowLeft, RotateCcw, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { pastOrders, restaurants } from "@/data/mockData";
import { useCart } from "@/context/CartContext";

const allOrders = [
  ...pastOrders,
  { id: "po5", dishName: "Margherita Pizza", restaurantName: "Napoli Express", image: "", price: 14.99, restaurantId: "r4", date: "Mar 18", status: "Delivered" },
  { id: "po6", dishName: "Dragon Roll", restaurantName: "Sakura Sushi", image: "", price: 16.99, restaurantId: "r6", date: "Mar 15", status: "Delivered" },
];

const OrderHistory = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

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
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Order History</h1>
      </div>

      <div className="flex flex-col gap-3">
        {pastOrders.map((order, i) => {
          const restaurant = restaurants.find(r => r.id === order.restaurantId);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={order.image} alt={order.dishName} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold truncate">{order.dishName}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.restaurantName}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-heading text-sm font-bold text-accent">${order.price.toFixed(2)}</span>
                    <span className="text-[10px] font-body text-success bg-success/10 px-2 py-0.5 rounded-full">Delivered</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleReorder(order)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-accent text-accent-foreground font-heading text-xs py-2 rounded-lg"
                >
                  <RotateCcw size={13} /> Reorder
                </button>
                <button
                  onClick={() => restaurant && navigate(`/restaurant/${restaurant.id}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-secondary text-foreground font-heading text-xs py-2 rounded-lg"
                >
                  <Star size={13} /> Rate
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderHistory;
