"use client";

import { useState } from "react";
import { registerSchema } from "@/constants/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { register } from "@/actions/auth-actions";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      role: "User",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setIsLoading(true);

    try {
      const result = await register(
        values.username,
        values.password,
        values.role
      );

      if (result.success) {
        toast("Registration successful", {
          description: "You can now log in",
        });
        router.push("/login");
      } else {
        toast("Registration failed", {
          description: "Please try again",
        });
      }
    } catch (error) {
      toast("An unexpected error occurred", {
        description: `Please try again later ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Input username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pr-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Input password"
                    className="border-0 focus-visible:ring-0 shadow-none"
                    {...field}
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {showPassword ? (
                      <EyeOffIcon className="size-5 text-muted-foreground" />
                    ) : (
                      <EyeIcon className="size-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="User">user</SelectItem>
                  <SelectItem value="Admin">admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full mt-3" type="submit" disabled={isLoading}>
          Register
        </Button>
      </form>
    </Form>
  );
};
export default RegisterForm;
