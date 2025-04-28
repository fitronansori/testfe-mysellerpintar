"use server";

import { cookies } from "next/headers";

export async function CreateCategory(category: string) {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    console.log("Token:", token);

    const response = await fetch(
      "https://test-fe.mysellerpintar.com/api/categories",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          bearerAuth: `Bearer ${token}`,
        },
        body: JSON.stringify({ category }),
      }
    );

    if (!response.ok) {
      return {
        success: false,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Create category error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
