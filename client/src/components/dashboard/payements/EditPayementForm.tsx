import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Loader2, Pen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PayementSchema } from "@/schema";
import { useEffect, useState } from "react";
import { IPayementInfo, IErrorResponse } from "@/interfaces";
import { PAYEMENTINPUTS } from "@/data";
import { showToast } from "@/utils/toastUtils";
import { AxiosError } from "axios";
import { useGetTenantsQuery } from "@/app/services/apiTenantsSlice";
import { useUpdatePayementMutation } from "@/app/services/apiPayementSlice";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Iprops {
  payement: IPayementInfo;
}

const EditPayementForm = ({ payement }: Iprops) => {
  const { id } = payement;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: tenants } = useGetTenantsQuery();
  const [updatePayement] = useUpdatePayementMutation();

  const form = useForm<IPayementInfo>({
    resolver: zodResolver(PayementSchema),
    defaultValues: {
      tenant: payement.tenant.toString(),
      date: payement.date,
      amount: Number(payement.amount),
      is_settled: payement.is_settled,
    },
  });

  useEffect(() => {
    if (payement) {
      form.reset({
        tenant: payement.tenant.toString(),
        amount: Number(payement.amount),
        date: payement.date,
        is_settled: payement.is_settled,
      });
    }
  }, [payement, form]);

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  const onSubmit = async (data: IPayementInfo) => {
    setIsLoading(true);
    try {
      const response = await updatePayement({
        id: id,
        payement: data,
      }).unwrap();
      showToast({ message: response.message, type: "success" });
    } catch (error) {
      const err = error as AxiosError<IErrorResponse>;
      const errorMessage = err.response?.data?.message || "Server error";
      showToast({ message: errorMessage, type: "error" });
    } finally {
      setIsLoading(false);
      setIsDialogOpen(false);
      form.reset({});
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={handleDialogToggle}>
        <DialogTrigger asChild>
          <Button size={"icon"} className="bg-green-600">
            <Pen />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Payement</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="tenant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                        }}
                        value={field.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Tenant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {tenants?.tenants.map((tenant) => (
                              <SelectItem
                                key={tenant.id}
                                value={tenant.id.toString()}
                              >
                                {tenant.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {PAYEMENTINPUTS.map(({ name, type }, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {name.charAt(0).toUpperCase() + name.slice(1)}
                      </FormLabel>
                      <FormControl>
                        {type === "textarea" ? (
                          <Textarea {...field} />
                        ) : (
                          <Input
                            type={type}
                            {...field}
                            onChange={(e) =>
                              field.onChange(
                                type === "number"
                                  ? Number(e.target.value)
                                  : e.target.value
                              )
                            }
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <FormField
                control={form.control}
                name="is_settled"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={String(field.value)}
                        onValueChange={(value) =>
                          field.onChange(value === "true")
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="settled-yes" />
                          <Label htmlFor="settled-yes">Payed</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="settled-no" />
                          <Label htmlFor="settled-no">Not Payed</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  )}
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditPayementForm;
