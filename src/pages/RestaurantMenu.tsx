import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { restaurants } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import CartFloatingButton from "@/components/CartFloatingButton";

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <div className="p-5 text-center text-muted-foreground">Restaurant not found</div>;
  }

  return (
    <div>
      {/* Hero */}
      <div className="relative h-52">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-10 left-4 p-2 rounded-full bg-card/80 text-foreground"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      {/* Info */}
      <div className="px-5 -mt-6 relative z-10">
        <div className="bg-card rounded-lg p-4 shadow-sm">
          <h1 className="font-heading text-xl font-bold text-foreground">{restaurant.name}</h1>
          <p className="font-body text-xs text-muted-foreground mt-0.5">{restaurant.cuisine} · {restaurant.priceRange}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-accent fill-accent" />
              <span className="font-heading text-xs font-bold">{restaurant.rating}</span>
              <span className="font-body text-[10px] text-muted-foreground">({restaurant.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-accent" />
              <span className="font-heading text-xs font-bold text-accent">{restaurant.deliveryTime} min</span>
            </div>
            <span className="font-body text-[10px] text-muted-foreground">Prep: {restaurant.prepTime} min</span>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-5 mt-6 pb-4">
        <h2 className="font-heading text-base font-bold mb-4">Menu</h2>
        <div className="flex flex-col gap-4">
          {restaurant.menu.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading text-sm font-bold text-foreground">{item.name}</p>
                <p className="font-body text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-heading text-sm font-bold">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() =>
                      addItem({
                        ...item,
                        quantity: 1,
                        restaurantName: restaurant.name,
                        restaurantId: restaurant.id,
                      })
                    }
                    className="bg-primary text-primary-foreground font-heading text-xs px-4 py-1.5 rounded-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CartFloatingButton />
    </div>
  );
};

export default RestaurantMenu;
