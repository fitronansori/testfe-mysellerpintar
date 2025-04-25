import Logo from "@/components/common/blog-logo";
import RegisterForm from "@/components/layouts/RegisterForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Card className="w-[400px]">
      <CardHeader className="flex items-center justify-center">
        <Logo />
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="items-center justify-center text-sm gap-1">
        <p className="text-slate-600">Already have an account? </p>
        <Link href="/login" className="text-primary underline">
          Login
        </Link>
      </CardFooter>
    </Card>
  );
};
export default RegisterPage;
