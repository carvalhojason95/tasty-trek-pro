import { ArrowLeft, Users, Link2, Plus, UserPlus, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const GroupOrders = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [hasGroup, setHasGroup] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const members = [
    { name: "You (Alex)", items: 2, total: 27.98, emoji: "👤" },
    { name: "Sarah K.", items: 1, total: 14.99, emoji: "👩" },
    { name: "Mike R.", items: 1, total: 16.99, emoji: "👨" },
  ];

  return (
    <div className="px-5 pt-12 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Group Orders</h1>
      </div>

      {!hasGroup ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Users size={36} className="text-accent" />
          </div>
          <h2 className="font-heading text-base font-bold mb-2">Order Together</h2>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-[260px] mx-auto">
            Start a group order and invite friends. Everyone picks their food, you pay together.
          </p>
          <button
            onClick={() => setHasGroup(true)}
            className="bg-accent text-accent-foreground font-heading text-sm px-8 py-3 rounded-xl"
          >
            Start Group Order
          </button>
        </div>
      ) : (
        <>
          {/* Share link */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6">
            <p className="font-heading text-xs font-bold mb-2">Share invite link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-card rounded-lg px-3 py-2 border border-border">
                <p className="font-body text-xs text-muted-foreground truncate">https://foodapp.co/group/abc123</p>
              </div>
              <button
                onClick={handleCopy}
                className={`p-2.5 rounded-lg transition-colors ${copied ? "bg-success text-success-foreground" : "bg-accent text-accent-foreground"}`}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Members */}
          <h3 className="font-heading text-sm font-bold mb-3">Members ({members.length})</h3>
          <div className="flex flex-col gap-2 mb-6">
            {members.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 bg-card rounded-xl p-3 border border-border"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  {m.emoji}
                </div>
                <div className="flex-1">
                  <p className="font-heading text-sm font-bold">{m.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{m.items} items</p>
                </div>
                <span className="font-heading text-sm font-bold text-accent">${m.total.toFixed(2)}</span>
              </motion.div>
            ))}
          </div>

          <button className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-xl py-3 text-muted-foreground hover:border-accent hover:text-accent transition-colors mb-4">
            <UserPlus size={16} /> Invite More Friends
          </button>

          <button className="w-full bg-accent text-accent-foreground font-heading text-sm py-3 rounded-xl">
            Place Group Order · ${members.reduce((s, m) => s + m.total, 0).toFixed(2)}
          </button>
        </>
      )}
    </div>
  );
};

export default GroupOrders;
