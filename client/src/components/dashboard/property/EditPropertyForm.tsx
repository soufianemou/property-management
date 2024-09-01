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
import { propertySchema } from "@/schema";
import { useEffect, useState } from "react";
import { IProperty, IErrorResponse } from "@/interfaces";
import { PROPERTYFIELDS } from "@/data";
import { useUpdatePropertyMutation } from "@/app/services/apiPropertySlice";
import { showToast } from "@/utils/toastUtils";
import { AxiosError } from "axios";

interface Iprops {
  property: IProperty;
}

const EditPropertyForm = ({ property }: Iprops) => {
  const { id } = property;
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateproperty] = useUpdatePropertyMutation();

  const form = useForm<IProperty>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: property.name,
      address: property.address,
      type: property.type,
      units: property.units,
      rental_cost:Number(property.rental_cost),
    },
  });

  useEffect(() => {
    if (property) {
      form.reset({
        name: property.name,
        address: property.address,
        type: property.type,
        units: property.units,
        rental_cost:Number(property.rental_cost),
      });
    }
  }, [property, form]);

  const handleDialogToggle = () => setIsDialogOpen((prev) => !prev);

  const onSubmit = async (data: IProperty) => {
    setIsLoading(true);
    try {
      const response = await updateproperty({
        id: id,
        property: data,
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
            <DialogTitle>Update property</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Type</FormLabel> */}
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
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
              {PROPERTYFIELDS.map(({ name, type }, index) => (
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

export default EditPropertyForm;
