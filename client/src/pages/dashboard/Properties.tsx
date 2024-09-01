import TableSkeleton from "@/components/skeletons/TableSkeleton";
import PageTitle from "@/components/ui/PageTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IProperty } from "@/interfaces";
import { useState } from "react";
import { useGetPropertiesQuery } from "@/app/services/apiPropertySlice";
import AddProperty from "@/components/dashboard/property/AddProperty";
import PropertyActions from "@/components/dashboard/property/PropertyActions";

const Properties = () => {
  const [type, stType] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("-created_at");

  const { isLoading, data, error } = useGetPropertiesQuery({
    type: type === "all" ? '' : type,
    sortBy,
  });

  const properties: IProperty[] = data?.properties ?? [];
  const totalproperties = data?.total ?? 0;

  // * Handlers
  const onChangeSortBy = (value: string) => setSortBy(value);
  const onChangeFilter = (value: string) => stType(value);

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching data </div>;

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="properties" />
      <AddProperty />
      <div className="flex space-x-2 justify-end text-md">
        {/* Filter by Type */}
        <Select onValueChange={(value) => onChangeFilter(value)} value={type}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup> 
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="apartment">apartment</SelectItem>
              <SelectItem value="house">house</SelectItem>
              <SelectItem value="office">office</SelectItem>
              <SelectItem value="duplex">duplex</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onChangeSortBy(value)} value={sortBy}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="-created_at">Latest</SelectItem>
              <SelectItem value="created_at">Oldest</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Count</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Rental Cost</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties?.length ? (
              properties?.map((property, index) => {
                const {
                  id,
                  name,
                  address,
                  type,
                  units,
                  rental_cost,
                  created_at,
                } = property;
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{address}</TableCell>
                    <TableCell>{type}</TableCell>
                    <TableCell>{units}</TableCell>
                    <TableCell>{rental_cost} Dh</TableCell>
                    <TableCell>
                      {new Date(created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <PropertyActions property={property} />
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No properties available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                Total : {totalproperties ?? 0}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Properties;
