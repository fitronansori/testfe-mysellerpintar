import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchArticleById } from "@/actions/articles-actions";

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const article = await fetchArticleById(resolvedParams.id);

  if (!article) {
    notFound();
  }

  return (
    <main className="container py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="size-4" />
        Back to articles
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <p className="text-sm text-muted-foreground">
              {new Date(article.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <Badge className="px-3 py-1 rounded-full border-none bg-blue-200 text-blue-900 font-normal">
              {article.category.name}
            </Badge>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {article.title}
          </h1>

          <div className="flex items-center gap-2">
            <p className="text-sm">
              By <span className="font-medium">{article.user.username}</span>
            </p>
          </div>
        </div>

        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={article.imageUrl || "/images/hero.jpg"}
            alt={article.title}
            fill
            priority
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {article.content
            .split("\n")
            .map((paragraph: string, index: number) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const article = await fetchArticleById(resolvedParams.id);

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
    };
  }

  return {
    title: article.title,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      images: [{ url: article.imageUrl || "/images/hero.jpg" }],
    },
  };
}
