import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 }, (_, index) => (
    <TableRow key={index}>
      <TableCell className="w-[100px]">
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-6 w-full" />
      </TableCell>
      <TableCell className="text-right">
        <Skeleton className="h-6 w-full" />
      </TableCell>
    </TableRow>
  ));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Count</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Creation Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{skeletonRows}</TableBody>
    </Table>
  );
};

export default TableSkeleton;
