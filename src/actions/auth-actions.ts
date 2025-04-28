"use server";

import { cookies } from "next/headers";

// type User = {
//   username: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// };

type LoginResponse = {
  token: string;
};

type RegisterResponse = {
  username: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export async function login(username: string, password: string) {
  try {
    const response = await fetch(
      "https://test-fe.mysellerpintar.com/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || "Login failed" };
    }

    const data: LoginResponse = await response.json();

    (await cookies()).set("auth_token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function register(
  username: string,
  password: string,
  role: string
) {
  try {
    const response = await fetch(
      "https://test-fe.mysellerpintar.com/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || "Registration failed" };
    }

    const data: RegisterResponse = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getProfile() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const response = await fetch(
      "https://test-fe.mysellerpintar.com/api/auth/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        (await cookies()).delete("auth_token");
        return { success: false, error: "Session expired" };
      }
      const error = await response.json();
      return {
        success: false,
        error: error.message || "Failed to fetch profile",
      };
    }

    const data = await response.json();
    return { success: true, user: data };
  } catch (error) {
    console.error("Profile fetch error:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function logout() {
  (await cookies()).delete("auth_token");
  return { success: true };
}

export async function getAuthStatus() {
  const token = (await cookies()).get("auth_token")?.value;
  return !!token;
}

export async function isAdmin() {
  const { success, user } = await getProfile();

  if (!success || !user) {
    return false;
  }

  return user.role === "Admin";
}
