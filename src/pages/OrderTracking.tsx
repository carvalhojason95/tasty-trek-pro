import { ArrowLeft, CheckCircle2, ChefHat, Bike, MapPin } from "lucide-react";
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
    <div className="px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate("/")} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Order Tracking</h1>
      </div>

      {/* Timer */}
      <div className="text-center mb-8">
        <p className="font-body text-sm text-muted-foreground">Estimated delivery</p>
        <p className="font-heading text-4xl font-bold text-accent animate-pulse-ember mt-1">{order.estimatedTime} min</p>
        <p className="font-body text-xs text-muted-foreground mt-1">from {order.restaurantName}</p>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-0 mb-8">
        {steps.map((step, i) => {
          const done = i <= currentStep;
          const active = i === currentStep;
          return (
            <div key={step.key} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                  done ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"
                } ${active ? "ring-2 ring-accent/30" : ""}`}>
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
              </div>
            </div>
          );
        })}
      </div>

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
        {order.status !== "confirmed" && (
          <p className="font-body text-xs text-muted-foreground mt-2">
            Delivery partner: {order.driverName}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
