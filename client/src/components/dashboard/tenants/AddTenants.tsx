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

import { TenantSchema } from "@/schema";
import { useState } from "react";
import {
  CustomAxiosError,
  IErrorResponse,
  IProperty,
  ITenants,
} from "@/interfaces";
import { TENANTFIELDS } from "@/data";
import { useCreateTenantsMutation } from "@/app/services/apiTenantsSlice";
import { showToast } from "@/utils/toastUtils";
import { useGetPropertiesQuery } from "@/app/services/apiPropertySlice";

const AddTenants = () => {
  const [formState, setFormState] = useState({
    isLoading: false,
    isDialogOpen: false,
  });
  const [createTenant] = useCreateTenantsMutation();
  const { data } = useGetPropertiesQuery({
    type: "",
    sortBy: "-created_at",
  });
  const properties: IProperty[] = data?.properties ?? [];

  const defaultValues: Partial<ITenants> = {
    name: "",
    telephone: "",
    section: "",
    property: properties.length > 0 ? properties[0]?.id.toString() : "",
  };
  const form = useForm<ITenants>({
    resolver: zodResolver(TenantSchema),
    defaultValues,
  });
  const handleDialogToggle = () => {
    setFormState((prevState) => ({
      ...prevState,
      isDialogOpen: !prevState.isDialogOpen,
    }));
  };
  const onSubmit = async (data: ITenants) => {
    setFormState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const response = await createTenant(data).unwrap();
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
          <Button>Add New Tenant</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tenant</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="property"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        value={field?.value?.toString()}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Property" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {properties.map((property) => (
                              <SelectItem
                                key={property.id}
                                value={property.id.toString()}
                              >
                                {property.name}
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

              {TENANTFIELDS.map(({ name, type, placeholder }, index) => (
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

export default AddTenants;
