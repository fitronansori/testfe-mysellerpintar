import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Please enter your username",
    })
    .max(50),
  password: z.string().min(8).max(50),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Please enter your username",
    })
    .max(50),
  password: z.string().min(8).max(50),
  role: z.enum(["admin", "user"]),
});
