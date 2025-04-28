import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
  textClassName?: string;
  textFallback?: string;
};

const UserAvatar = ({
  className,
  textClassName,
  textFallback,
}: UserAvatarProps) => {
  const firstLetter = textFallback?.charAt(0).toUpperCase();
  return (
    <Avatar className={cn("", className)}>
      <AvatarFallback className={cn("bg-slate-500 text-white", textClassName)}>
        {firstLetter}
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
