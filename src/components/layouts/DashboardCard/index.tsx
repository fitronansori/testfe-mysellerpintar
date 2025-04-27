import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type DashboardCardProps = {
  children?: React.ReactNode;
  className?: string;
};

const DashboardCard = ({ children, className }: DashboardCardProps) => {
  return (
    <Card className={cn("p-0 gap-0 bg-gray-50", className)}>{children}</Card>
  );
};
export default DashboardCard;
