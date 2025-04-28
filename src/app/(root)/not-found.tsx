import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container h-[calc(100vh-96px)] flex flex-col items-center justify-center min-h-[70vh] py-12">
      <h2 className="text-4xl font-bold mb-4">404 - Not Found</h2>
      <p className="text-xl text-muted-foreground mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        Return Home
      </Link>
    </div>
  );
}
