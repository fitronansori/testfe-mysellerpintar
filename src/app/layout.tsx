import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/components/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth-context";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genzet Blog",
  description: "A blog for the GenZ generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", archivo.variable)}>
        <AuthProvider>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
