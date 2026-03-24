import { ArrowLeft, CreditCard, Plus, Check, Smartphone, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const methods = [
  { id: "pm1", type: "card", label: "Visa •••• 4242", subtitle: "Expires 09/27", icon: CreditCard, color: "text-accent" },
  { id: "pm2", type: "card", label: "Mastercard •••• 8888", subtitle: "Expires 12/26", icon: CreditCard, color: "text-warning" },
  { id: "pm3", type: "wallet", label: "Apple Pay", subtitle: "Connected", icon: Smartphone, color: "text-foreground" },
  { id: "pm4", type: "cash", label: "Cash on Delivery", subtitle: "Always available", icon: Banknote, color: "text-success" },
];

const PaymentMethods = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("pm1");

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Payment Methods</h1>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        {methods.map((m, i) => (
          <motion.button
            key={m.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelected(m.id)}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              selected === m.id
                ? "bg-accent/5 border-accent shadow-sm"
                : "bg-card border-border"
            }`}
          >
            <div className={`w-11 h-11 rounded-full bg-secondary flex items-center justify-center ${m.color}`}>
              <m.icon size={20} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-heading text-sm font-bold">{m.label}</p>
              <p className="font-body text-xs text-muted-foreground">{m.subtitle}</p>
            </div>
            {selected === m.id && (
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                <Check size={14} className="text-accent-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>

      <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-4 text-muted-foreground hover:border-accent hover:text-accent transition-colors">
        <Plus size={18} />
        <span className="font-heading text-sm font-bold">Add Payment Method</span>
      </button>
    </div>
  );
};

export default PaymentMethods;
