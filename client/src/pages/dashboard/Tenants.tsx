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

import { ITenants } from "@/interfaces";

import AddTenants from "@/components/dashboard/tenants/AddTenants";
import TenantsActions from "@/components/dashboard/tenants/TenantsActions";
import { useGetTenantsQuery } from "@/app/services/apiTenantsSlice";

const Tenants = () => {
  const { isLoading, data, error } = useGetTenantsQuery();

  const tenants: ITenants[] = data?.tenants ?? [];
  const totalproperties = data?.total ?? 0;

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching data </div>;

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Tenants" />
      <AddTenants />
      <div className="rounded-md border">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Count</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Telephone</TableHead>
              <TableHead>Property chosen</TableHead>
              <TableHead>Sections occupied</TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tenants?.length ? (
              tenants?.map((tenant, index) => {
                const {
                  id,
                  name,
                  telephone,
                  property_name,
                  section,
                  created_at,
                } = tenant;
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{name}</TableCell>
                    <TableCell>{telephone}</TableCell>
                    <TableCell>{property_name}</TableCell>
                    <TableCell>{section}</TableCell>
                    <TableCell>
                      {new Date(created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <TenantsActions tenant={tenant} />
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

export default Tenants;
