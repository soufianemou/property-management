import { cn } from "@/lib/utils";

interface IProps {
  title: string;
  classname?: string;
}

export default function PageTitle({ title, classname }: IProps) {
  return <h1 className={cn("text-2xl font-semibold", classname)}>{title}</h1>;
}
