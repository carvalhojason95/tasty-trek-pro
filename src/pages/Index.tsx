import { Search, MapPin, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pastOrders, restaurants } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import CartFloatingButton from "@/components/CartFloatingButton";

const Index = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const quickDelivery = restaurants.filter((r) => r.deliveryTime <= 20);
  const budgetMeals = restaurants.filter((r) => r.priceRange === "$");

  const handleInstantReorder = (order: typeof pastOrders[0]) => {
    const restaurant = restaurants.find((r) => r.id === order.restaurantId);
    if (restaurant) {
      const menuItem = restaurant.menu.find((m) => m.name === order.dishName);
      if (menuItem) {
        addItem({ ...menuItem, quantity: 1, restaurantName: restaurant.name, restaurantId: restaurant.id });
        navigate("/cart");
      }
    }
  };

  return (
    <div className="px-5 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-body mb-0.5">
            <MapPin size={12} />
            <span>Delivering to</span>
          </div>
          <h2 className="font-heading text-base font-bold text-foreground">123 Main Street</h2>
        </div>
        <button
          onClick={() => navigate("/support")}
          className="p-2 rounded-full bg-secondary text-muted-foreground"
        >
          <HelpCircle size={18} />
        </button>
      </div>

      {/* Search */}
      <button
        onClick={() => navigate("/restaurants")}
        className="w-full flex items-center gap-3 bg-secondary rounded-lg px-4 py-3 mb-8"
      >
        <Search size={18} className="text-muted-foreground" />
        <span className="text-muted-foreground font-body text-sm">Search for food or restaurants</span>
      </button>

      {/* Order Again */}
      <section className="mb-8">
        <h3 className="font-heading text-lg font-bold mb-4">Order Again</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {pastOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => handleInstantReorder(order)}
              className="flex-shrink-0 w-36 text-left"
            >
              <div className="w-36 h-28 rounded-lg overflow-hidden mb-2">
                <img src={order.image} alt={order.dishName} className="w-full h-full object-cover" />
              </div>
              <p className="font-heading text-xs font-bold text-foreground truncate">{order.dishName}</p>
              <p className="font-body text-[10px] text-muted-foreground truncate">{order.restaurantName}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Delivery */}
      <section className="mb-8">
        <h3 className="font-heading text-lg font-bold mb-4">Under 20 Minutes</h3>
        <div className="flex flex-col gap-4">
          {quickDelivery.map((r) => (
            <button
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="flex gap-3 text-left"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 py-1">
                <p className="font-heading text-sm font-bold text-foreground truncate">{r.name}</p>
                <p className="font-body text-xs text-muted-foreground">{r.cuisine} · {r.priceRange}</p>
                <p className="font-heading text-xs text-accent font-bold mt-1">{r.deliveryTime} min</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Popular Near You */}
      <section className="mb-8">
        <h3 className="font-heading text-lg font-bold mb-4">Popular Near You</h3>
        <div className="flex flex-col gap-5">
          {restaurants.slice(0, 4).map((r) => (
            <button
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="text-left"
            >
              <div className="w-full h-44 rounded-lg overflow-hidden mb-2.5">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-heading text-sm font-bold text-foreground">{r.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{r.cuisine} · {r.priceRange}</p>
                </div>
                <span className="font-heading text-xs text-accent font-bold">{r.deliveryTime} min</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Budget Meals */}
      {budgetMeals.length > 0 && (
        <section className="mb-8">
          <h3 className="font-heading text-lg font-bold mb-4">Budget Meals</h3>
          <div className="flex flex-col gap-4">
            {budgetMeals.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/restaurant/${r.id}`)}
                className="flex gap-3 text-left"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <p className="font-heading text-sm font-bold text-foreground truncate">{r.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{r.cuisine} · {r.priceRange}</p>
                  <p className="font-heading text-xs text-accent font-bold mt-1">{r.deliveryTime} min</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      <CartFloatingButton />
    </div>
  );
};

export default Index;
