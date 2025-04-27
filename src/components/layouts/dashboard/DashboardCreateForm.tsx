"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
// import Tiptap from "../RichTextEditor";
import Link from "next/link";
import dynamic from "next/dynamic";

const Tiptap = dynamic(() => import("@/components/layouts/RichTextEditor"), {
  ssr: false,
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnail: z.string().optional(),
});

const DashboardCreateForm = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      thumbnail: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const url = URL.createObjectURL(file);
      setThumbnailUrl(url);
      form.setValue("thumbnail", url);
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Thumbnails */}
          <div className="max-w-fit">
            <FormLabel>Thumbnails</FormLabel>
            <div className="bg-white border border-dashed rounded-md p-6 flex flex-col items-center justify-center mt-2">
              {thumbnailUrl ? (
                <div className="relative w-full h-40">
                  <Image
                    src={thumbnailUrl || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    onClick={() => {
                      setThumbnailUrl("");
                      form.setValue("thumbnail", "");
                    }}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer text-sm text-blue-600 hover:text-blue-800"
                  >
                    Click to select files
                  </label>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept=".jpg,.png"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Support File Type : jpg or png
                  </p>
                </>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Input title"
                    className="bg-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className=" bg-white text-black">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="cat1">Web</SelectItem>
                    <SelectItem value="mobile">Mobile</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The existing category list can be seen in the{" "}
                  <Link href={"/dashboard/category"} className="text-primary">
                    category
                  </Link>{" "}
                  menu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Tiptap />

          <div className="bg-white py-4 flex justify-end gap-2">
            <Button variant={"outline"} type="button">
              Cancel
            </Button>
            <Button variant={"secondary"} type="button">
              Preview
            </Button>
            <Button type="submit">Upload</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default DashboardCreateForm;
