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
import { Input } from "@/components/ui/input";
import { Loader2, Pen } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TenantSchema } from "@/schema";
import { useEffect, useState } from "react";
import { ITenants, IErrorResponse, IProperty } from "@/interfaces";
import { TENANTFIELDS } from "@/data";
import { useUpdateTenantsMutation } from "@/app/services/apiTenantsSlice";
import { showToast } from "@/utils/toastUtils";
import { AxiosError } from "axios";
import { useGetPropertiesQuery } from "@/app/services/apiPropertySlice";

interface Iprops {
  tenant: ITenants;
}

const EditTenantsForm = ({ tenant }: Iprops) => {
  const { id } = tenant;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateTenant] = useUpdateTenantsMutation();
  const { data } = useGetPropertiesQuery({
    type: "",
    sortBy: "-created_at",
  });
  const properties: IProperty[] = data?.properties ?? [];

  const form = useForm<ITenants>({
    resolver: zodResolver(TenantSchema),
    defaultValues: {
      name: tenant.name,
      telephone: tenant.telephone,
      section: tenant.section,
      property: tenant.property.toString(),
    },
  });

  useEffect(() => {
    if (tenant) {
      form.reset({
        name: tenant.name,
        telephone: tenant.telephone,
        section: tenant.section,
        property: tenant.property.toString(),
      });
    }
  }, [tenant, form]);

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  const onSubmit = async (data: ITenants) => {
    setIsLoading(true);
    try {
      const response = await updateTenant({
        id: id,
        tenant: data,
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
            <DialogTitle>Update tenant</DialogTitle>
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
                        value={field.value?.toString()}
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
              {TENANTFIELDS.map(({ name, type }, index) => (
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

export default EditTenantsForm;
