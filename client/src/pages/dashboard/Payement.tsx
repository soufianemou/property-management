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
import { IPayementInfo } from "@/interfaces";
import { useGetPayementsInfoQuery } from "@/app/services/apiPayementSlice";
import { Badge } from "@/components/ui/badge";
import AddPayement from "@/components/dashboard/payements/AddPayement";
import PaymentActions from "@/components/dashboard/payements/PaymentActions";

const Payements = () => {
  const { isLoading, data, error } = useGetPayementsInfoQuery();

  const payments: IPayementInfo[] = data?.payments ?? [];
  const totalproperties = data?.total ?? 0;

  if (isLoading) return <TableSkeleton />;
  if (error) return <div>Error fetching data </div>;

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Payements" />
      <AddPayement />

      <div className="rounded-md border">
        <Table className="bg-white rounded-md">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Count</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Property chosen</TableHead>
              <TableHead>rental cost</TableHead>
              <TableHead>Sections occupied </TableHead>
              <TableHead>Payed</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.length ? (
              payments?.map((payement, index) => {
                const { id, tenant_name, amount, date, property_name, is_settled } =
                  payement;
                return (
                  <TableRow key={id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{tenant_name}</TableCell>
                    <TableCell>{property_name}</TableCell>
                    <TableCell>{amount} Dh</TableCell>
                    <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {is_settled ? (
                        <Badge variant={"success"}>payed</Badge>
                      ) : (
                        <Badge variant={"destructive"}>has not payed</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <PaymentActions payement={payement} />
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

export default Payements;
