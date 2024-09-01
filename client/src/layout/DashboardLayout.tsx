import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/sidebar";
import UserMenu from "@/components/dashboard/UserMenu";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen w-full bg-quaternary text-black flex">
      <Sidebar />
      <div className="p-8 w-full">
        <div className="flex justify-end ">
          <UserMenu />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
