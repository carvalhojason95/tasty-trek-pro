import { useState, useMemo } from "react";
import { Search, ArrowLeft, TrendingUp, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { restaurants, trendingSearches } from "@/data/mockData";
import CartFloatingButton from "@/components/CartFloatingButton";
import RestaurantCard from "@/components/RestaurantCard";

const recentSearches = ["Pho", "Burger Joint", "Poke Bowl"];

const RestaurantList = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const filtered = useMemo(() =>
    restaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        r.menu.some(m => m.name.toLowerCase().includes(query.toLowerCase()))
    ), [query]
  );

  const suggestions = useMemo(() => {
    if (query.length < 2) return [];
    const allItems = restaurants.flatMap(r => r.menu.map(m => m.name));
    const allNames = restaurants.map(r => r.name);
    return [...new Set([...allNames, ...allItems])]
      .filter(s => s.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [query]);

  const showOverlay = isFocused && query.length === 0;

  return (
    <div className="px-5 pt-12">
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft size={22} />
        </button>
        <div className="flex-1 flex items-center gap-3 bg-secondary rounded-lg px-4 py-2.5">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search food, restaurants, cuisines"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="flex-1 bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Search Overlay: Recent + Trending */}
      {showOverlay && (
        <div className="mb-6 animate-fade-in">
          <div className="mb-4">
            <p className="font-heading text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1">
              <Clock size={12} /> Recent Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="bg-card border border-border rounded-full px-3 py-1.5 font-body text-xs text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-heading text-xs font-bold text-muted-foreground mb-2 flex items-center gap-1">
              <TrendingUp size={12} /> Trending Now
            </p>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="bg-accent/10 border border-accent/20 rounded-full px-3 py-1.5 font-body text-xs text-accent font-bold"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Auto-suggestions */}
      {suggestions.length > 0 && query.length >= 2 && (
        <div className="mb-4 bg-card rounded-lg border border-border overflow-hidden animate-fade-in">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="w-full text-left px-4 py-2.5 font-body text-sm text-foreground hover:bg-secondary border-b border-border last:border-0 flex items-center gap-2"
            >
              <Search size={13} className="text-muted-foreground" />
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-5">
        {filtered.map((r) => (
          <RestaurantCard key={r.id} restaurant={r} variant="full" />
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
