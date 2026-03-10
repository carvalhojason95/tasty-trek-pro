import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { restaurants } from "@/data/mockData";
import CartFloatingButton from "@/components/CartFloatingButton";

const RestaurantList = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 flex items-center gap-3 bg-secondary rounded-lg px-4 py-2.5">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search restaurants or cuisines"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {filtered.map((r) => (
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
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body text-sm py-12">No restaurants found</p>
        )}
      </div>

      <CartFloatingButton />
    </div>
  );
};

export default RestaurantList;
