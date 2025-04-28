import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Article } from "@/constants/dataTypes";
import Image from "next/image";
import Link from "next/link";

export const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <Link href={`/articles/${article.id}`}>
      <Card className="py-0 rounded-[12px] shadow-none border-0 gap-4 group transition-all cursor-pointer">
        <CardHeader className="p-0 h-[240px]">
          <Image
            src={article.imageUrl || "/images/hero.jpg"}
            alt="blog-img"
            width={1920}
            height={1277}
            loading="lazy"
            className="w-full h-[240px] object-cover rounded-[12px] group-hover:opacity-90 transition-opacity"
          />
        </CardHeader>

        <CardContent className="h-full p-0 flex flex-col justify-between gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-gray-600 transition-colors">
            {new Date(article.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <CardTitle className="text-base sm:text-[18px] leading-7 font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </CardTitle>

          <CardDescription className="text-sm sm:text-base leading-6 line-clamp-2 group-hover:text-gray-700 transition-colors">
            {article.content}
          </CardDescription>

          <div className="flex items-center gap-2">
            <Badge className="px-3 py-1 rounded-full border-none bg-blue-200 text-blue-900 font-normal text-xs sm:text-sm group-hover:bg-blue-300 group-hover:text-blue-800 transition-colors">
              {article.category.name}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
