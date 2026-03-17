import { Clock } from "lucide-react";

interface DeliveryTimeBadgeProps {
  minutes: number;
  showIcon?: boolean;
  className?: string;
}

const DeliveryTimeBadge = ({ minutes, showIcon = true, className = "" }: DeliveryTimeBadgeProps) => {
  const colorClass = minutes <= 20 ? "delivery-fast" : minutes <= 30 ? "delivery-moderate" : "delivery-slow";

  return (
    <span className={`inline-flex items-center gap-1 font-heading text-xs font-bold ${colorClass} ${className}`}>
      {showIcon && <Clock size={12} />}
      {minutes} min
    </span>
  );
};

export default DeliveryTimeBadge;
