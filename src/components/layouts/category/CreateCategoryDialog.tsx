import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateDialogForm from "./CreateDialogForm";

const CreateCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader className="pb-4">
          <DialogTitle>Add Category</DialogTitle>
        </DialogHeader>

        <CreateDialogForm />
      </DialogContent>
    </Dialog>
  );
};
export default CreateCategoryDialog;
