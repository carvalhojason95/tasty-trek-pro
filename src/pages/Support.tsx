import { ArrowLeft, MessageCircle, Phone, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const issues = [
  { icon: MessageCircle, label: "Wrong or missing items", desc: "Report issues with your order" },
  { icon: Phone, label: "Delivery delay", desc: "Get help with late deliveries" },
  { icon: FileText, label: "Payment issue", desc: "Refunds, charges, or payment errors" },
];

const Support = () => {
  const navigate = useNavigate();

  return (
    <div className="px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="text-foreground"><ArrowLeft size={22} /></button>
        <h1 className="font-heading text-lg font-bold">Help & Support</h1>
      </div>

      <p className="font-body text-sm text-muted-foreground mb-6">How can we help you today?</p>

      <div className="flex flex-col gap-3">
        {issues.map((issue) => (
          <button
            key={issue.label}
            className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border text-left"
          >
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <issue.icon size={18} className="text-foreground" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">{issue.label}</p>
              <p className="font-body text-xs text-muted-foreground">{issue.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Support;
