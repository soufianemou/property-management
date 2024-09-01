import { useState } from "react";
import { Nav } from "./nav";
import { ChevronRight, CreditCard, User, MapPinHouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWindowWidth } from "@react-hook/window-size";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="relative bg-primary min-w-[90px] border-r px-7 pb-10 pt-20">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            variant="secondary"
            className="rounded-full p-2"
            onClick={toggleSidebar}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Properties",
            href: "/properties",
            Icon: MapPinHouse,
            variant: "ghost",
          },
          {
            title: "Tenants",
            href: "/tenants",
            Icon: User,
            variant: "ghost",
          },
          {
            title: "Payments",
            href: "/payments",
            Icon: CreditCard,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
