import Logo from "@/components/common/blog-logo";
import LoginForm from "@/components/layouts/LoginForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const LoginPage = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex items-center justify-center">
        <Logo />
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="items-center justify-center text-sm gap-1">
        <p className="text-slate-600">Don&apos;t have an account? </p>
        <Link href="/register" className="text-primary underline">
          Register
        </Link>
      </CardFooter>
    </Card>
  );
};
export default LoginPage;
