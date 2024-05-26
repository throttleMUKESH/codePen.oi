
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {  LoaderCircle, Trash2 } from "lucide-react";

import { HandleError } from "@/utils/HandleError";
import { useDeleteCodeMutation } from "@/redux/slice/api";

const CodeItem =  ({ data }: { data: codeType }) => {
  const [deleteCode, { isLoading }] = useDeleteCodeMutation();
  const handleDelete = async () => {
    const response = await deleteCode(data._id!).unwrap();
    console.log(response);
    try {
    } catch (error) {
      HandleError(error);
    }
  };
  return (
    <div className="p-3 rounded cursor-pointer bg-slate-800 flex justify-start items-center flex-col gap-3">
      <div className="__top flex justify-center items-start gap-3 w-full">
        <p className="font-mono font-bold text-lg ">{data.title}</p>
      </div>
      <Separator />
      <div className="__btn_container flex gap-4">
        <Link to={`/compiler/${data._id}`} target="_blank">
          <Button variant="outline">Open Code</Button>
        </Link>
        <div className="__btn_container flex gap-1">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                className="flex gap-1"
                disabled={isLoading}
              >
                {isLoading && <LoaderCircle className="animate-spin" />}

                <Trash2 size={17} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex gap-2 mt-4 mb-2 justify-center items-center tracking-normal">
                  Confirm to Delete Code!
                </DialogTitle>
                <div className="__url flex justify-center items-center gap-1">
                  <Button
                    variant="destructive"
                    className="h-full"
                    onClick={handleDelete}
                    loading={isLoading}
                  >
                    Confirm Delete
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CodeItem;
