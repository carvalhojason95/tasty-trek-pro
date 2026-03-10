import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();

  const deliveryFee = 2.99;
  const discount = total > 30 ? 5 : 0;
  const grandTotal = total + deliveryFee - discount;

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

      <div className="flex flex-col gap-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-heading text-sm font-bold truncate">{item.name}</p>
              <p className="font-body text-[10px] text-muted-foreground">{item.restaurantName}</p>
              <p className="font-heading text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
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
          <div className="flex justify-between font-body text-sm mb-2 text-accent">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
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
