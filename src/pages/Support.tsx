import { ArrowLeft, MessageCircle, Phone, FileText, XCircle, Clock, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const issues = [
  { icon: Clock, label: "Late delivery", desc: "Get help with delayed orders", color: "text-warning" },
  { icon: MessageCircle, label: "Wrong or missing items", desc: "Report issues with your order", color: "text-destructive" },
  { icon: XCircle, label: "Cancel order", desc: "Cancel an active order", color: "text-destructive" },
  { icon: CreditCard, label: "Payment issue", desc: "Refunds, charges, or payment errors", color: "text-accent" },
  { icon: FileText, label: "Other issue", desc: "Anything else we can help with", color: "text-muted-foreground" },
];

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 pt-12 pb-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Help & Support</h1>
      </div>

      <p className="font-body text-sm text-muted-foreground mb-6">How can we help you today?</p>

      <div className="flex flex-col gap-3 mb-8">
        {issues.map((issue) => (
          <button
            key={issue.label}
            className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border text-left active:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <issue.icon size={18} className={issue.color} />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">{issue.label}</p>
              <p className="font-body text-xs text-muted-foreground">{issue.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Contact Options */}
      <div className="bg-card rounded-lg p-4 border border-border">
        <p className="font-heading text-sm font-bold mb-3">Contact Us</p>
        <div className="flex gap-3">
          <button className="flex-1 flex flex-col items-center gap-2 bg-accent/10 rounded-lg py-4">
            <MessageCircle size={22} className="text-accent" />
            <span className="font-heading text-xs font-bold text-foreground">Live Chat</span>
          </button>
          <button className="flex-1 flex flex-col items-center gap-2 bg-success/10 rounded-lg py-4">
            <Phone size={22} className="text-success" />
            <span className="font-heading text-xs font-bold text-foreground">Call Support</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Support;
