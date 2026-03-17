import { ArrowLeft, CheckCircle2, ChefHat, Bike, MapPin, Phone, MessageCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { activeOrder } from "@/data/mockData";

const steps = [
  { key: "confirmed", label: "Order Confirmed", icon: CheckCircle2 },
  { key: "preparing", label: "Preparing Food", icon: ChefHat },
  { key: "picked_up", label: "Picked Up", icon: Bike },
  { key: "delivering", label: "On the Way", icon: MapPin },
] as const;

const statusIndex: Record<string, number> = {
  confirmed: 0,
  preparing: 1,
  picked_up: 2,
  delivering: 3,
  delivered: 4,
};

const OrderTracking = () => {
  const navigate = useNavigate();
  const order = activeOrder;
  const currentStep = statusIndex[order.status];

  return (
    <div className="px-5 pt-12 pb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/")} className="text-foreground"><ArrowLeft size={22} /></button>
          <h1 className="font-heading text-lg font-bold">Order Tracking</h1>
        </div>
        <button
          onClick={() => navigate("/support")}
          className="p-2 rounded-full bg-secondary text-muted-foreground"
        >
          <HelpCircle size={18} />
        </button>
      </div>

      {/* Timer */}
      <div className="text-center mb-6">
        <p className="font-body text-sm text-muted-foreground">Estimated delivery</p>
        <p className="font-heading text-4xl font-bold text-accent animate-pulse-ember mt-1">{order.estimatedTime} min</p>
        <p className="font-body text-xs text-muted-foreground mt-1">from {order.restaurantName}</p>
      </div>

      {/* Live Map Placeholder */}
      <div className="bg-secondary rounded-lg h-40 mb-6 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
            backgroundSize: "30px 30px"
          }} />
        </div>
        <div className="text-center z-10">
          <MapPin size={28} className="text-accent mx-auto mb-1" />
          <p className="font-body text-xs text-muted-foreground">Live map tracking</p>
          {order.liveLocation && (
            <p className="font-body text-[10px] text-muted-foreground mt-0.5">
              {order.liveLocation.lat.toFixed(3)}, {order.liveLocation.lng.toFixed(3)}
            </p>
          )}
        </div>
      </div>

      {/* Delay Warning */}
      {order.delayReason && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-6 flex items-start gap-3">
          <AlertTriangle size={18} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-heading text-xs font-bold text-foreground">Slight delay</p>
            <p className="font-body text-[11px] text-muted-foreground">{order.delayReason}</p>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="flex flex-col gap-0 mb-6">
        {steps.map((step, i) => {
          const done = i <= currentStep;
          const active = i === currentStep;
          return (
            <div key={step.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                  done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                } ${active ? "ring-2 ring-accent/30 scale-110" : ""}`}>
                  <step.icon size={18} />
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-8 ${done ? "bg-accent" : "bg-border"}`} />
                )}
              </div>
              <div className="pt-2">
                <p className={`font-heading text-sm ${done ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                  {step.label}
                </p>
                {active && (
                  <p className="font-body text-[10px] text-accent mt-0.5">In progress...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contact Delivery Partner */}
      {order.status !== "confirmed" && order.driverName && (
        <div className="bg-card rounded-lg p-4 border border-border mb-6">
          <p className="font-heading text-sm font-bold mb-3">Delivery Partner</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-sm font-bold text-foreground">{order.driverName}</p>
              <p className="font-body text-[10px] text-muted-foreground">Your delivery partner</p>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <Phone size={16} className="text-success" />
              </button>
              <button className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <MessageCircle size={16} className="text-accent" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Summary */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <p className="font-heading text-sm font-bold mb-2">Order Summary</p>
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between font-body text-sm py-1">
            <span>{item.quantity}x {item.name}</span>
          </div>
        ))}
        <div className="border-t border-border mt-2 pt-2 flex justify-between font-heading text-sm font-bold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
