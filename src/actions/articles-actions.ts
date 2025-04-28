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
      // Build the base URL
      let url = `https://test-fe.mysellerpintar.com/api/articles?page=${page}&limit=${limit}`;

      // Add filters if provided - try different parameter names that the API might use
      if (category) {
        console.log(`Filtering by category: ${category}`);
        // Try different parameter names that the API might use for category filtering
        url += `&categoryId=${category}`;
      }

      // The API might use a different parameter name for search
      if (search) {
        url += `&title=${encodeURIComponent(search)}`;
        // Some APIs use 'q' for search
        url += `&q=${encodeURIComponent(search)}`;
      }

      console.log("Fetching articles with URL:", url);

      // Disable cache for search queries to ensure fresh results
      const cacheOption =
        search || category
          ? { cache: "no-store" as RequestCache }
          : { next: { revalidate: 60 } };
      const res = await fetch(url, cacheOption);

      if (!res.ok) {
        throw new Error(`Failed to fetch articles: ${res.status}`);
      }

      const data: ArticlesResponse = await res.json();
      console.log(
        `Fetched ${data.data.length} articles out of ${data.total} total`
      );

      // If the API doesn't support server-side filtering, we can perform client-side filtering
      let filteredData = data.data;

      // Client-side category filtering if needed
      if (category && filteredData.length === data.total) {
        console.log("Performing client-side category filtering");
        filteredData = filteredData.filter(
          (article) => article.categoryId === category
        );
        console.log(
          `Filtered to ${filteredData.length} articles after client-side category filtering`
        );
      }

      // Client-side search filtering if needed
      if (search && filteredData.length === data.total) {
        console.log("Performing client-side search filtering");
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
        total: category || search ? filteredData.length : data.total, // Adjust total for client-side filtering
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
    ); // Cache for 1 hour

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
      console.log(`Fetching article with ID: ${id}`);
      // API mungkin tidak mendukung pengambilan artikel berdasarkan ID
      // Mari kita ambil semua artikel terlebih dahulu dan filter berdasarkan ID
      const allArticles = await fetchArticles(1, 100);

      // Cari artikel dengan ID yang sesuai
      const article = allArticles.data.find((article) => article.id === id);

      if (!article) {
        console.log(`Article with ID ${id} not found in the data`);
        return null;
      }

      console.log(`Found article:`, article);
      return article;
    } catch (error) {
      console.error(`Error fetching article ${id}:`, error);
      return null;
    }
  }
);
