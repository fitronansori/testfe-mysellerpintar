import DasboardHeader from "@/components/layouts/AppSidebar/DashboardHeader";

import {
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DashboardCard from "@/components/layouts/DashboardCard";
import CreateCategoryDialog from "@/components/layouts/category/CreateCategoryDialog";
import DeleteCategoryDialog from "@/components/layouts/category/DeleteCategoryDialog";
import EditCategoryDialog from "@/components/layouts/category/EditCategoryDialog";

const CategoryData = [
  {
    id: 1,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 2,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 3,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 4,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 5,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 6,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 7,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 8,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 9,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 10,
    name: "Technology",
    createdAt: "April 13, 2025 10:55:12",
  },
];

const CategoryPage = () => {
  return (
    <section>
      <DasboardHeader pageName="Category" />

      <div className="p-6">
        <DashboardCard>
          <CardHeader className="p-6">
            <CardTitle className="font-medium">Total Category : 25</CardTitle>
          </CardHeader>

          <CardContent className="p-0 border-t">
            <div className="p-6 bg-gray-50 flex items-center justify-between">
              <div>Search Function</div>
              <CreateCategoryDialog />
            </div>
            <Table className="w-full lg:table-fixed overflow-y-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[33.33%] text-sm font-medium text-center">
                    Category
                  </TableHead>
                  <TableHead className="w-[33.33%] text-sm font-medium text-center">
                    Created at
                  </TableHead>
                  <TableHead className="w-[33.33%] text-sm font-medium text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {CategoryData.map((post) => (
                  <TableRow key={post.id} className="bg-white">
                    <TableCell className="py-3 px-4 text-sm text-slate-600 text-center">
                      {post.name}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm text-slate-600 text-center">
                      {post.createdAt}
                    </TableCell>
                    <TableCell className="py-3 px-4 text-sm">
                      <div className="flex gap-2 items-center justify-center">
                        <EditCategoryDialog />
                        <DeleteCategoryDialog />
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
        </DashboardCard>
      </div>
    </section>
  );
};
export default CategoryPage;
