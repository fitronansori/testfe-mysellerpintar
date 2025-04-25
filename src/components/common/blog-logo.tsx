import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  typeLogo?: "default" | "white";
};

const Logo = ({ className, typeLogo = "default" }: LogoProps) => {
  return (
    <Link href={"/"} className={cn("", className)}>
      {typeLogo === "default" ? (
        <Image
          src={"/icon/loremlogo.svg"}
          alt="logo-default"
          width={134}
          height={24}
          priority
        />
      ) : (
        <Image
          src={"/icon/loremlogo-white.svg"}
          alt="logo-white"
          width={134}
          height={24}
          priority
        />
      )}
    </Link>
  );
};

export default Logo;
