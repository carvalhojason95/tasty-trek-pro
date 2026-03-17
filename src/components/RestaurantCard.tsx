import { Star, Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Restaurant } from "@/data/mockData";
import DeliveryTimeBadge from "./DeliveryTimeBadge";

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "full" | "compact";
}

const RestaurantCard = ({ restaurant: r, variant = "full" }: RestaurantCardProps) => {
  const navigate = useNavigate();

  if (variant === "compact") {
    return (
      <button
        onClick={() => navigate(`/restaurant/${r.id}`)}
        className="flex gap-3 text-left w-full"
      >
        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
          <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
          {r.tags?.includes("Best Seller") && (
            <span className="absolute top-1 left-1 bg-accent text-accent-foreground text-[8px] font-heading font-bold px-1.5 py-0.5 rounded">
              Best Seller
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0 py-0.5">
          <div className="flex items-center gap-1.5">
            <p className="font-heading text-sm font-bold text-foreground truncate">{r.name}</p>
            {r.isVeg && <Leaf size={12} className="text-success flex-shrink-0" />}
          </div>
          <p className="font-body text-xs text-muted-foreground">{r.cuisine} · {r.priceRange}</p>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="inline-flex items-center gap-0.5 text-xs font-heading font-bold">
              <Star size={11} className="text-accent fill-accent" />
              {r.rating}
              <span className="font-body text-[10px] text-muted-foreground font-normal">({r.reviewCount})</span>
            </span>
            <DeliveryTimeBadge minutes={r.deliveryTime} />
          </div>
          {r.tags && r.tags.length > 0 && (
            <div className="flex gap-1 mt-1.5">
              {r.tags.filter(t => t !== "Best Seller").slice(0, 2).map((tag) => (
                <span key={tag} className="text-[9px] font-body bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate(`/restaurant/${r.id}`)}
      className="text-left w-full"
    >
      <div className="w-full h-44 rounded-lg overflow-hidden mb-2.5 relative">
        <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-3">
          <DeliveryTimeBadge minutes={r.deliveryTime} className="!text-accent-foreground bg-accent/90 px-2 py-0.5 rounded" />
        </div>
        {r.tags?.includes("Best Seller") && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[9px] font-heading font-bold px-2 py-0.5 rounded">
            🔥 Best Seller
          </span>
        )}
      </div>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <p className="font-heading text-sm font-bold text-foreground">{r.name}</p>
            {r.isVeg && <Leaf size={12} className="text-success" />}
          </div>
          <p className="font-body text-xs text-muted-foreground">{r.cuisine} · {r.priceRange}</p>
        </div>
        <span className="inline-flex items-center gap-1 bg-success/10 text-success font-heading text-xs font-bold px-2 py-0.5 rounded">
          <Star size={11} className="fill-success" />
          {r.rating}
        </span>
      </div>
    </button>
  );
};

export default RestaurantCard;
