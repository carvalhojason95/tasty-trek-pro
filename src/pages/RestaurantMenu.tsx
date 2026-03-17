import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Star, Leaf, Award } from "lucide-react";
import { restaurants } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import CartFloatingButton from "@/components/CartFloatingButton";
import DeliveryTimeBadge from "@/components/DeliveryTimeBadge";

const RestaurantMenu = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return <div className="p-5 text-center text-muted-foreground">Restaurant not found</div>;
  }

  const popularItems = restaurant.menu.filter(m => m.isPopular);
  const otherItems = restaurant.menu.filter(m => !m.isPopular);

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
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground">{restaurant.name}</h1>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{restaurant.cuisine} · {restaurant.priceRange}</p>
            </div>
            <span className="inline-flex items-center gap-1 bg-success/10 text-success font-heading text-sm font-bold px-2.5 py-1 rounded">
              <Star size={13} className="fill-success" />
              {restaurant.rating}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="font-body text-[10px] text-muted-foreground">
              {restaurant.reviewCount} reviews
            </span>
            <DeliveryTimeBadge minutes={restaurant.deliveryTime} />
            <span className="font-body text-[10px] text-muted-foreground">Prep: {restaurant.prepTime} min</span>
          </div>
          {restaurant.tags && restaurant.tags.length > 0 && (
            <div className="flex gap-1.5 mt-3">
              {restaurant.tags.map((tag) => (
                <span key={tag} className="text-[10px] font-heading font-bold bg-secondary text-muted-foreground px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Dishes */}
      {popularItems.length > 0 && (
        <div className="px-5 mt-6">
          <h2 className="font-heading text-base font-bold mb-3 flex items-center gap-1.5">
            <Award size={15} className="text-accent" /> Popular Dishes
          </h2>
          <div className="flex flex-col gap-4">
            {popularItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                restaurant={restaurant}
                addItem={addItem}
                showBestSeller
              />
            ))}
          </div>
        </div>
      )}

      {/* Full Menu */}
      <div className="px-5 mt-6 pb-4">
        <h2 className="font-heading text-base font-bold mb-3">Full Menu</h2>
        <div className="flex flex-col gap-4">
          {(popularItems.length > 0 ? otherItems : restaurant.menu).map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              restaurant={restaurant}
              addItem={addItem}
            />
          ))}
        </div>
      </div>

      <CartFloatingButton />
    </div>
  );
};

function MenuItemCard({ item, restaurant, addItem, showBestSeller = false }: {
  item: typeof restaurants[0]["menu"][0];
  restaurant: typeof restaurants[0];
  addItem: any;
  showBestSeller?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {showBestSeller && item.isBestSeller && (
          <span className="absolute top-0.5 left-0.5 bg-accent text-accent-foreground text-[7px] font-heading font-bold px-1 py-0.5 rounded">
            ⭐ Best
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="font-heading text-sm font-bold text-foreground">{item.name}</p>
          {item.isVeg && (
            <span className="w-3.5 h-3.5 border border-success rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
            </span>
          )}
        </div>
        <p className="font-body text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{item.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="font-heading text-sm font-bold">₹{item.price.toFixed(2)}</span>
          <button
            onClick={() =>
              addItem({
                ...item,
                quantity: 1,
                restaurantName: restaurant.name,
                restaurantId: restaurant.id,
              })
            }
            className="bg-accent text-accent-foreground font-heading text-xs px-4 py-1.5 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;
