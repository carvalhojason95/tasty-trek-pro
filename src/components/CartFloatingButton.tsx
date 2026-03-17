import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartFloatingButton = () => {
  const { itemCount, total } = useCart();
  const navigate = useNavigate();

  if (itemCount === 0) return null;

  return (
    <button
      onClick={() => navigate("/cart")}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 max-w-md w-[calc(100%-2rem)] bg-primary text-primary-foreground rounded-lg px-5 py-3.5 flex items-center justify-between shadow-lg animate-slide-up"
    >
      <div className="flex items-center gap-2">
        <ShoppingBag size={18} />
        <span className="font-heading text-sm">{itemCount} item{itemCount > 1 ? "s" : ""}</span>
      </div>
      <span className="font-heading text-sm">${total.toFixed(2)}</span>
    </button>
  );
};

export default CartFloatingButton;
