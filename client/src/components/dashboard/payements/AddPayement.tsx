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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { PayementSchema } from "@/schema";
import { useState } from "react";
import { CustomAxiosError, IErrorResponse, IPayementInfo } from "@/interfaces";
import { PAYEMENTINPUTS } from "@/data";
import { useCreatePayementMutation } from "@/app/services/apiPayementSlice";
import { showToast } from "@/utils/toastUtils";
import { useGetTenantsQuery } from "@/app/services/apiTenantsSlice";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const AddPayement = () => {
  const [formState, setFormState] = useState({
    isLoading: false,
    isDialogOpen: false,
  });

  const { data: tenants } = useGetTenantsQuery();
  
  const [createPayement] = useCreatePayementMutation();
  const defaultValues: Partial<IPayementInfo> = {
    tenant:  '',
    amount: 0,
    date: new Date().toISOString().split("T")[0],
    is_settled: false,
  };

  const form = useForm<IPayementInfo>({
    resolver: zodResolver(PayementSchema),
    defaultValues,
  });

  const handleDialogToggle = () => {
    setFormState((prevState) => ({
      ...prevState,
      isDialogOpen: !prevState.isDialogOpen,
    }));
  };

  const onSubmit = async (data: IPayementInfo) => {
    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await createPayement(data).unwrap();
      showToast({ message: response.message, type: "success" });
    } catch (error) {
      const err = error as CustomAxiosError<IErrorResponse>;
      const errorMessage =
        err.response?.data?.message || err.data?.message || "server error";
      showToast({ message: errorMessage, type: "error" });
    } finally {
      setFormState({ isLoading: false, isDialogOpen: false });
      form.reset(defaultValues);
    }
  };

  return (
    <div>
      <Dialog open={formState.isDialogOpen} onOpenChange={handleDialogToggle}>
        <DialogTrigger asChild>
          <Button>Add New Payement</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Payement</DialogTitle>
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
                          field.onChange(value);
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

              {PAYEMENTINPUTS.map(({ name, type, placeholder }, index) => (
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
                        <Input
                          type={type}
                          {...field}
                          placeholder={placeholder}
                          onChange={(e) =>
                            field.onChange(
                              type === "number"
                                ? Number(e.target.value)
                                : e.target.value
                            )
                          }
                        />
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
                <Button type="submit" disabled={formState.isLoading}>
                  {formState.isLoading && (
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  )}
                  {formState.isLoading ? "" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPayement;
