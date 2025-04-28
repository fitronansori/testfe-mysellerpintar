import ArticleCard from "../ArticleCard";
import { fetchArticles } from "@/actions/articles-actions";
import ArticlePagination from "./ArticlePagination";

const Articles = async ({
  initialPage = 1,
  category = "",
  search = "",
}: {
  initialPage?: number;
  category?: string;
  search?: string;
}) => {
  const limit = 9;

  const { data, total } = await fetchArticles(
    initialPage,
    limit,
    category,
    search
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <section className="py-10">
      <div className="container">
        <div className="hidden lg:block mb-6">
          <p className="font-medium text-slate-600">
            Showing: {data.length} of {total} articles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px]">
          {data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <ArticlePagination
          currentPage={initialPage}
          totalPages={totalPages}
          category={category}
          search={search}
        />
      </div>
    </section>
  );
};
export default Articles;
