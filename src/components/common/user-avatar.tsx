import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = {
  className?: string;
  textClassName?: string;
};

const UserAvatar = ({ className, textClassName }: UserAvatarProps) => {
  return (
    <Avatar className={cn("", className)}>
      <AvatarFallback className={cn("bg-slate-500 text-white", textClassName)}>
        C
      </AvatarFallback>
    </Avatar>
  );
};
export default UserAvatar;
