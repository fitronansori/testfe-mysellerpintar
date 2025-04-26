import DasboardHeader from "@/components/layouts/AppSidebar/DashboardHeader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    thumbnail: "/images/hero.jpg",
    title: "Cybersecurity Essentials Every Developer Should Know",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 2,
    thumbnail: "/images/hero.jpg",
    title: "The Future of Work: Remote-First Teams and Digital Tools",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 3,
    thumbnail: "/images/hero.jpg",
    title: "Design Systems: Why Your Team Needs One in 2025",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 4,
    thumbnail: "/images/hero.jpg",
    title: "Web3 and the Decentralized Internet: What You Need to Know",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 5,
    thumbnail: "/images/hero.jpg",
    title: "Debugging Like a Pro: Tools & Techniques for Faster Fixes",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 6,
    thumbnail: "/images/hero.jpg",
    title: "Accessibility in Design: More Than Just Compliance",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 7,
    thumbnail: "/images/hero.jpg",
    title: "Figma's New Dev Mode: A Game-Changer for Designers & Developers",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 8,
    thumbnail: "/images/hero.jpg",
    title: "How AI Is Changing the Game in Front-End Development",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 9,
    thumbnail: "/images/hero.jpg",
    title: "10 UI Trends Dominating 2025",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 10,
    thumbnail: "/images/hero.jpg",
    title: "Debugging Like a Pro: Tools & Techniques for Faster Fixes",
    category: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
];

const DashboardPage = () => {
  return (
    <section>
      <DasboardHeader pageName="Articles" />

      <div className="p-6">
        <Card className="p-0 gap-0">
          <CardHeader className="p-6">
            <CardTitle className="font-medium">Total Articles : 25</CardTitle>
          </CardHeader>
          <CardContent className="p-0 border-t">
            <div className="p-6 bg-white flex items-center justify-between">
              <div>Search Function</div>
              <Button asChild>
                <Link href="/dashboard/create">
                  <Plus />
                  Add Articles
                </Link>
              </Button>
            </div>
            <Table className="w-full lg:table-fixed overflow-y-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[20%] text-sm font-medium text-center">
                    Thumbnails
                  </TableHead>
                  <TableHead className="w-[20%] text-sm font-medium text-center">
                    Title
                  </TableHead>
                  <TableHead className="w-[20%] text-sm font-medium text-center">
                    Category
                  </TableHead>
                  <TableHead className="w-[20%] text-sm font-medium text-center">
                    Created at
                  </TableHead>
                  <TableHead className="w-[20%] text-sm font-medium text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id} className="bg-white">
                    <TableCell className="py-3 px-4">
                      <div className="size-[60px] relative mx-auto">
                        <Image
                          src={post.thumbnail || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium py-3 px-4 break-words align-middle">
                      <p className="whitespace-normal text-sm text-slate-600 line-clamp-2">
                        {post.title}
                      </p>
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-600 text-center">
                      {post.category}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-600 text-center">
                      {post.createdAt}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm">
                      <div className="flex gap-2 items-center justify-center">
                        <Link
                          href={`/preview/${post.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Preview
                        </Link>
                        <Link
                          href={`/edit/${post.id}`}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <button className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
};
export default DashboardPage;
