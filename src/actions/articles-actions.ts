"use server";

import type {
  Article,
  ArticlesResponse,
  Category,
} from "@/constants/dataTypes";
import { cache } from "react";

export const fetchArticles = cache(
  async (
    page = 1,
    limit = 10,
    category?: string,
    search?: string
  ): Promise<{ data: Article[]; total: number }> => {
    try {
      let url = `https://test-fe.mysellerpintar.com/api/articles?page=${page}&limit=${limit}`;

      if (category) {
        url += `&categoryId=${category}`;
      }

      if (search) {
        url += `&title=${encodeURIComponent(search)}`;
        url += `&q=${encodeURIComponent(search)}`;
      }
      const cacheOption =
        search || category
          ? { cache: "no-store" as RequestCache }
          : { next: { revalidate: 60 } };
      const res = await fetch(url, cacheOption);

      if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status}`);
      }

      const data: ArticlesResponse = await res.json();

      let filteredData = data.data;

      if (category && filteredData.length === data.total) {
        filteredData = filteredData.filter(
          (article) => article.categoryId === category
        );
        console.log(
          `Filtered to ${filteredData.length} articles after client-side category filtering`
        );
      }

      if (search && filteredData.length === data.total) {
        const searchLower = search.toLowerCase();
        filteredData = filteredData.filter(
          (article) =>
            article.title.toLowerCase().includes(searchLower) ||
            article.content.toLowerCase().includes(searchLower)
        );
        console.log(
          `Filtered to ${filteredData.length} articles after client-side search filtering`
        );
      }

      return {
        data: filteredData,
        total: category || search ? filteredData.length : data.total,
      };
    } catch (error) {
      console.error("Error fetching articles:", error);
      return { data: [], total: 0 };
    }
  }
);

export const fetchCategories = cache(async (): Promise<Category[]> => {
  try {
    const res = await fetch(
      "https://test-fe.mysellerpintar.com/api/categories",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
});

export const fetchArticleById = cache(
  async (id: string): Promise<Article | null> => {
    try {
      const allArticles = await fetchArticles(1, 100);
      const article = allArticles.data.find((article) => article.id === id);

      if (!article) {
        return null;
      }

      return article;
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      return null;
    }
  }
);
