import { ArrowLeft, Heart, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { restaurants } from "@/data/mockData";
import DeliveryTimeBadge from "@/components/DeliveryTimeBadge";

const favoriteIds = ["r5", "r3", "r1", "r6", "r4"];
const favoriteRestaurants = restaurants.filter(r => favoriteIds.includes(r.id));

const Favorites = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Favorites</h1>
        <span className="ml-auto bg-accent/10 text-accent text-xs font-heading font-bold px-2.5 py-1 rounded-full">{favoriteRestaurants.length}</span>
      </div>

      <div className="flex flex-col gap-4">
        {favoriteRestaurants.map((r, i) => (
          <motion.button
            key={r.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/restaurant/${r.id}`)}
            className="bg-card rounded-xl overflow-hidden border border-border shadow-sm text-left"
          >
            <div className="relative h-32">
              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center">
                <Heart size={16} className="text-destructive fill-destructive" />
              </div>
              <div className="absolute bottom-2 left-2">
                <DeliveryTimeBadge minutes={r.deliveryTime} />
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <p className="font-heading text-sm font-bold">{r.name}</p>
                <span className="inline-flex items-center gap-1 text-success font-heading text-xs font-bold">
                  <Star size={11} className="fill-success" /> {r.rating}
                </span>
              </div>
              <p className="font-body text-xs text-muted-foreground mt-0.5">{r.cuisine} · {r.priceRange} · {r.reviewCount} reviews</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
