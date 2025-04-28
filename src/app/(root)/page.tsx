import Articles from "@/components/layouts/Articles";
import ArticleLoading from "@/components/layouts/Articles/ArticleLoading";
import Hero from "@/components/layouts/Hero";
import { Suspense } from "react";

const Home = async ({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; search?: string };
}) => {
  const resolvedParams = await searchParams;
  const page = resolvedParams.page ? Number.parseInt(resolvedParams.page) : 1;
  const category = resolvedParams.category || "";
  const search = resolvedParams.search || "";

  console.log("Home page rendering with search params:", {
    page,
    category,
    search,
  });

  return (
    <>
      <Hero />
      <Suspense
        key={`${category}-${search}-${page}`}
        fallback={<ArticleLoading />}
      >
        <Articles initialPage={page} category={category} search={search} />
      </Suspense>
    </>
  );
};
export default Home;
