"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { fetchCategories } from "@/actions/articles-actions";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

const formSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

export default function ArticleSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: initialCategory,
      search: initialSearch,
    },
  });

  const currentSearch = form.watch("search");
  const currentCategory = form.watch("category");

  const debouncedSearch = useDebounce(currentSearch, 500);

  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };

    getCategories();
  }, []);

  useEffect(() => {
    if (
      debouncedSearch !== initialSearch ||
      currentCategory !== initialCategory
    ) {
      handleSearch();
    }
  }, [debouncedSearch, currentCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = (value: string) => {
    form.setValue("category", value);
    handleSearch();
  };

  function handleSearch() {
    const values = form.getValues();

    startTransition(() => {
      const params = new URLSearchParams();

      if (values.category && values.category !== "all") {
        params.set("category", values.category);
      }

      if (values.search) params.set("search", values.search);
      params.set("page", "1");

      console.log("Search triggered with values:", values);
      console.log("URL params:", params.toString());

      router.push(`/?${params.toString()}`);
    });
  }

  return (
    <Form {...form}>
      <div className="w-full sm:w-fit bg-primary p-2.5 flex flex-col md:flex-row items-center justify-center gap-2 rounded-[12px]">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full md:w-[180px]">
              <Select
                onValueChange={handleCategoryChange}
                value={field.value}
                disabled={isPending}
              >
                <FormControl>
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.name.toLowerCase()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full md:w-[400px]">
              <FormControl>
                <div className="w-full h-9 bg-white relative flex items-center rounded-md border focus-within:ring-1 focus-within:ring-ring px-2">
                  <Search className="size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles"
                    className="bg-white text-black border-0 focus-visible:ring-0 shadow-none"
                    {...field}
                    disabled={isPending}
                  />
                  {isPending && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="h-4 w-4 border-t-2 border-primary rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
