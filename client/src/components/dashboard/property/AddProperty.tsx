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

import { propertySchema } from "@/schema";
import { useState } from "react";
import { CustomAxiosError, IProperty, IErrorResponse } from "@/interfaces";
import { PROPERTYFIELDS } from "@/data";
import { useCreatePropertyMutation } from "@/app/services/apiPropertySlice";
import { showToast } from "@/utils/toastUtils";

const AddProperty = () => {
  const [formState, setFormState] = useState({
    isLoading: false,
    isDialogOpen: false,
  });
  const [createProperty] = useCreatePropertyMutation();
  const defaultValues: Partial<IProperty> = {
    name: "",
    address: "",
    type: "",
    units: 1,
    rental_cost: 0,
  };
  const form = useForm<IProperty>({
    resolver: zodResolver(propertySchema),
    defaultValues,
  });
  const handleDialogToggle = () => {
    setFormState((prevState) => ({
      ...prevState,
      isDialogOpen: !prevState.isDialogOpen,
    }));
  };
  const onSubmit = async (data: IProperty) => {
    console.log(data);

    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await createProperty(data).unwrap();
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
          <Button>Add New Property</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Property</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="duplex">Duplex</SelectItem>
                            <SelectItem value="office">Office</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {PROPERTYFIELDS.map(({ name, type, placeholder }, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                       {name.charAt(0).toUpperCase() + name.slice(1)} 
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

export default AddProperty;
