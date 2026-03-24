import { ArrowLeft, Leaf, Utensils, Package, Recycle, TreePine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const EcoPreferences = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = useState({
    noCutlery: true,
    ecoPackaging: true,
    carbonOffset: false,
    paperBag: false,
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const options = [
    { key: "noCutlery" as const, icon: Utensils, label: "No cutlery", desc: "Skip plastic utensils", saving: "Saves ~2g plastic per order" },
    { key: "ecoPackaging" as const, icon: Package, label: "Eco packaging", desc: "Biodegradable containers when available", saving: "Saves $0.50 per order" },
    { key: "carbonOffset" as const, icon: TreePine, label: "Carbon offset", desc: "Add $0.25 to offset delivery emissions", saving: "Offsets ~0.5kg CO₂" },
    { key: "paperBag" as const, icon: Recycle, label: "Paper bag only", desc: "No plastic bags for delivery", saving: "Reduces plastic waste" },
  ];

  const activeCount = Object.values(prefs).filter(Boolean).length;

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Eco Preferences</h1>
      </div>

      {/* Impact summary */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-xl p-5 mb-6 text-center"
      >
        <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-3">
          <Leaf size={28} className="text-success" />
        </div>
        <p className="font-heading text-base font-bold">Your Eco Impact</p>
        <p className="font-body text-xs text-muted-foreground mt-1 mb-3">You've saved ~48g of plastic this month</p>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <p className="font-heading text-lg font-bold text-success">24</p>
            <p className="font-body text-[10px] text-muted-foreground">Eco Orders</p>
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-success">48g</p>
            <p className="font-body text-[10px] text-muted-foreground">Plastic Saved</p>
          </div>
          <div>
            <p className="font-heading text-lg font-bold text-success">$12</p>
            <p className="font-body text-[10px] text-muted-foreground">Saved</p>
          </div>
        </div>
      </motion.div>

      {/* Toggles */}
      <h3 className="font-heading text-sm font-bold mb-3">Preferences ({activeCount}/4 active)</h3>
      <div className="flex flex-col gap-3">
        {options.map((opt, i) => (
          <motion.button
            key={opt.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggle(opt.key)}
            className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${
              prefs[opt.key] ? "bg-success/5 border-success/20" : "bg-card border-border"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              prefs[opt.key] ? "bg-success/15 text-success" : "bg-secondary text-muted-foreground"
            }`}>
              <opt.icon size={18} />
            </div>
            <div className="flex-1">
              <p className="font-heading text-sm font-bold">{opt.label}</p>
              <p className="font-body text-xs text-muted-foreground">{opt.desc}</p>
              <p className="font-body text-[10px] text-success mt-0.5">{opt.saving}</p>
            </div>
            <div className={`w-10 h-6 rounded-full transition-colors flex items-center ${
              prefs[opt.key] ? "bg-success justify-end" : "bg-border justify-start"
            }`}>
              <div className="w-4 h-4 rounded-full bg-card mx-1 shadow-sm" />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default EcoPreferences;
