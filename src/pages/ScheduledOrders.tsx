import { ArrowLeft, CalendarClock, Clock, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const initialScheduled = [
  { id: "s1", dish: "Butter Chicken + Naan", restaurant: "Spice Route", date: "Tomorrow", time: "12:30 PM", image: "🍛" },
  { id: "s2", dish: "Salmon Poke Bowl", restaurant: "Aloha Bowls", date: "Fri, Mar 28", time: "7:00 PM", image: "🥗" },
];

const ScheduledOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(initialScheduled);

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Scheduled Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <CalendarClock size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="font-heading text-sm font-bold text-muted-foreground">No scheduled orders</p>
          <p className="font-body text-xs text-muted-foreground mt-1">Schedule your meals ahead of time</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-6">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl">
                  {order.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading text-sm font-bold truncate">{order.dish}</p>
                  <p className="font-body text-xs text-muted-foreground">{order.restaurant}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-[10px] font-heading font-bold px-2 py-0.5 rounded-full">
                      <CalendarClock size={10} /> {order.date}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-secondary text-muted-foreground text-[10px] font-heading font-bold px-2 py-0.5 rounded-full">
                      <Clock size={10} /> {order.time}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setOrders(prev => prev.filter(o => o.id !== order.id))}
                  className="p-2 text-destructive/60 hover:text-destructive"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/")}
        className="w-full flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading text-sm py-3 rounded-xl"
      >
        <Plus size={16} /> Schedule New Order
      </button>
    </div>
  );
};

export default ScheduledOrders;
