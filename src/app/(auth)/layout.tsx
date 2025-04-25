export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-background sm:bg-muted w-full h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
