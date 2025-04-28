import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCategoryForm from "./EditCategoryForm";

const EditCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-blue-500 hover:underline">
        Edit
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        <EditCategoryForm />
      </DialogContent>
    </Dialog>
  );
};
export default EditCategoryDialog;
