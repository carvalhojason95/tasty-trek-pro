import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, Clock, Tag, Leaf as EcoLeaf } from "lucide-react";
import { useCart } from "@/context/CartContext";
import DeliveryTimeBadge from "@/components/DeliveryTimeBadge";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const [ecoMode, setEcoMode] = useState(false);

  const deliveryFee = 2.99;
  const discount = total > 30 ? 5 : 0;
  const ecoDiscount = ecoMode ? 0.50 : 0;
  const grandTotal = total + deliveryFee - discount - ecoDiscount;
  const estimatedDelivery = 25;

  const handlePlaceOrder = () => {
    clearCart();
    navigate("/tracking");
  };

  if (items.length === 0) {
    return (
      <div className="px-5 pt-12">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
          <h1 className="font-heading text-lg font-bold">Your Cart</h1>
        </div>
        <div className="text-center py-20">
          <p className="font-body text-muted-foreground">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-primary text-primary-foreground font-heading text-sm px-6 py-2.5 rounded-lg"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-5 pt-12 pb-32">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Your Cart</h1>
      </div>

      {/* Delivery Time Preview */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-5 flex items-center gap-3">
        <Clock size={18} className="text-accent" />
        <div>
          <p className="font-heading text-xs font-bold text-foreground">
            Estimated delivery: <DeliveryTimeBadge minutes={estimatedDelivery} showIcon={false} />
          </p>
          <p className="font-body text-[10px] text-muted-foreground">Based on current traffic conditions</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm font-bold truncate">{item.name}</p>
              <p className="font-body text-[10px] text-muted-foreground">{item.restaurantName}</p>
              <p className="font-heading text-sm mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-secondary">
                <Minus size={14} />
              </button>
              <span className="font-heading text-sm w-5 text-center">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-secondary">
                <Plus size={14} />
              </button>
              <button onClick={() => removeItem(item.id)} className="p-1 text-destructive ml-1">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Eco Mode Toggle */}
      <button
        onClick={() => setEcoMode(!ecoMode)}
        className={`w-full flex items-center justify-between p-3 rounded-lg border mb-6 transition-colors ${
          ecoMode ? "bg-success/10 border-success/30" : "bg-card border-border"
        }`}
      >
        <div className="flex items-center gap-2">
          <EcoLeaf size={16} className={ecoMode ? "text-success" : "text-muted-foreground"} />
          <div className="text-left">
            <p className="font-heading text-xs font-bold">Eco-friendly packaging</p>
            <p className="font-body text-[10px] text-muted-foreground">No cutlery, minimal packaging – save $0.50</p>
          </div>
        </div>
        <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${
          ecoMode ? "bg-success justify-end" : "bg-border justify-start"
        }`}>
          <div className="w-4 h-4 rounded-full bg-card mx-1 shadow-sm" />
        </div>
      </button>

      {/* Summary */}
      <div className="bg-card rounded-lg p-4 border border-border mb-6">
        <div className="flex justify-between font-body text-sm mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-body text-sm mb-2">
          <span className="text-muted-foreground">Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between font-body text-sm mb-2 text-success">
            <span className="flex items-center gap-1"><Tag size={12} /> Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        {ecoDiscount > 0 && (
          <div className="flex justify-between font-body text-sm mb-2 text-success">
            <span className="flex items-center gap-1"><EcoLeaf size={12} /> Eco savings</span>
            <span>-${ecoDiscount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-border my-2" />
        <div className="flex justify-between font-heading text-base font-bold">
          <span>Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handlePlaceOrder}
        className="fixed bottom-20 left-1/2 -translate-x-1/2 max-w-md w-[calc(100%-2rem)] bg-accent text-accent-foreground font-heading text-sm py-3.5 rounded-lg shadow-lg z-40"
      >
        Place Order · ${grandTotal.toFixed(2)}
      </button>
    </div>
  );
};

export default Cart;
