import { useState } from "react";
import { Search, MapPin, HelpCircle, Star, CalendarClock, Users, Leaf as EcoLeaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pastOrders, restaurants, cravingCategories } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import CartFloatingButton from "@/components/CartFloatingButton";
import FilterChips from "@/components/FilterChips";
import RestaurantCard from "@/components/RestaurantCard";
import DeliveryTimeBadge from "@/components/DeliveryTimeBadge";

const filters = ["Veg", "Fast Delivery", "Budget", "Top Rated"];

const Index = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const getFilteredRestaurants = () => {
    if (!activeFilter) return restaurants;
    switch (activeFilter) {
      case "Veg": return restaurants.filter(r => r.menu.some(m => m.isVeg));
      case "Fast Delivery": return restaurants.filter(r => r.deliveryTime <= 20);
      case "Budget": return restaurants.filter(r => r.priceRange === "$");
      case "Top Rated": return restaurants.filter(r => r.rating >= 4.7);
      default: return restaurants;
    }
  };

  const filteredRestaurants = getFilteredRestaurants();
  const quickDelivery = restaurants.filter((r) => r.deliveryTime <= 20);
  const budgetMeals = restaurants.filter((r) => r.priceRange === "$");
  const recommended = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, 3);

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
      <div className="flex items-center justify-between mb-5">
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
        className="w-full flex items-center gap-3 bg-secondary rounded-lg px-4 py-3 mb-4"
      >
        <Search size={18} className="text-muted-foreground" />
        <span className="text-muted-foreground font-body text-sm">Search for food or restaurants</span>
      </button>

      {/* Filter Chips */}
      <div className="mb-6">
        <FilterChips filters={filters} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Smart Feature Quick Actions */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar -mx-5 px-5">
        <button className="flex-shrink-0 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5">
          <CalendarClock size={16} className="text-accent" />
          <span className="font-body text-xs font-bold text-foreground">Schedule</span>
        </button>
        <button className="flex-shrink-0 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5">
          <Users size={16} className="text-accent" />
          <span className="font-body text-xs font-bold text-foreground">Group Order</span>
        </button>
        <button className="flex-shrink-0 flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2.5">
          <EcoLeaf size={16} className="text-success" />
          <span className="font-body text-xs font-bold text-foreground">Eco Mode</span>
        </button>
      </div>

      {/* Cravings */}
      <section className="mb-8">
        <h3 className="font-heading text-base font-bold mb-3">What are you craving?</h3>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
          {cravingCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate("/restaurants")}
              className="flex-shrink-0 bg-card border border-border rounded-xl px-4 py-3 text-center min-w-[80px]"
            >
              <span className="text-2xl block mb-1">{cat.label.split(" ")[0]}</span>
              <span className="font-body text-[10px] text-muted-foreground">{cat.label.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Order Again */}
      <section className="mb-8">
        <h3 className="font-heading text-base font-bold mb-3">Order Again</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5">
          {pastOrders.map((order) => (
            <button
              key={order.id}
              onClick={() => handleInstantReorder(order)}
              className="flex-shrink-0 w-36 text-left"
            >
              <div className="w-36 h-28 rounded-lg overflow-hidden mb-2 relative">
                <img src={order.image} alt={order.dishName} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 bg-accent text-accent-foreground text-[9px] font-heading font-bold px-1.5 py-0.5 rounded">
                  Reorder
                </span>
              </div>
              <p className="font-heading text-xs font-bold text-foreground truncate">{order.dishName}</p>
              <p className="font-body text-[10px] text-muted-foreground truncate">{order.restaurantName}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Recommended For You */}
      <section className="mb-8">
        <h3 className="font-heading text-base font-bold mb-3">
          <Star size={14} className="inline text-accent fill-accent mr-1 -mt-0.5" />
          Recommended for You
        </h3>
        <div className="flex flex-col gap-4">
          {recommended.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} variant="compact" />
          ))}
        </div>
      </section>

      {/* Quick Delivery */}
      <section className="mb-8">
        <h3 className="font-heading text-base font-bold mb-3">⚡ Under 20 Minutes</h3>
        <div className="flex flex-col gap-4">
          {quickDelivery.map((r) => (
            <RestaurantCard key={r.id} restaurant={r} variant="compact" />
          ))}
        </div>
      </section>

      {/* Popular Near You */}
      {activeFilter ? (
        <section className="mb-8">
          <h3 className="font-heading text-base font-bold mb-3">Results</h3>
          <div className="flex flex-col gap-5">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} variant="full" />
              ))
            ) : (
              <p className="text-center text-muted-foreground font-body text-sm py-8">No restaurants match this filter</p>
            )}
          </div>
        </section>
      ) : (
        <section className="mb-8">
          <h3 className="font-heading text-base font-bold mb-3">Popular Near You</h3>
          <div className="flex flex-col gap-5">
            {restaurants.slice(0, 4).map((r) => (
              <RestaurantCard key={r.id} restaurant={r} variant="full" />
            ))}
          </div>
        </section>
      )}

      {/* Budget Meals */}
      {!activeFilter && budgetMeals.length > 0 && (
        <section className="mb-8">
          <h3 className="font-heading text-base font-bold mb-3">💰 Budget Meals</h3>
          <div className="flex flex-col gap-4">
            {budgetMeals.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} variant="compact" />
            ))}
          </div>
        </section>
      )}

      <CartFloatingButton />
    </div>
  );
};

export default Index;
