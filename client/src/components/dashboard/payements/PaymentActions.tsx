import { Loader2, Trash } from "lucide-react";
import { IErrorResponse, IPayementInfo } from "@/interfaces";
import { Button } from "../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { showToast } from "@/utils/toastUtils";
import { AxiosError } from "axios";
import { useState } from "react";
import { useDeletePayementMutation } from "@/app/services/apiPayementSlice";
import EditPayementForm from "./EditPayementForm";

interface Iprops {
  payement: IPayementInfo;
}
const PaymentActions = ({ payement }: Iprops) => {
  const [deletPayement, { isLoading: isDeleting }] =
    useDeletePayementMutation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleDelete = async (id: string) => {
    try {
      const result = await deletPayement(id).unwrap();
      showToast({ message: result.message, type: "success" });
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      const errorMessage = err.response?.data?.message || "server error";
      showToast({ message: errorMessage, type: "error" });
    } finally {
      setIsDialogOpen(false);
    }
  };
  return (
    <div className="flex items-center gap-2">
      <EditPayementForm payement={payement} />
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger>
          <Button size={"icon"} variant={"destructive"}>
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this payement?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => handleDelete(payement.id)}
              disabled={isDeleting}
            >
              {isDeleting && <Loader2 className="mr-2 h-6 w-6 animate-spin" />}
              {isDeleting ? "" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentActions;
