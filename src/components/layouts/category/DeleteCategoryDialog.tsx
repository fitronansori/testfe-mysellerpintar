import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="text-red-500 hover:underline">
        Delete
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Delete category &quot;Technology&quot; This will remove it from
            master data permanently.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <DialogTrigger asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogTrigger>

          <Button variant={"destructive"}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteCategoryDialog;
