import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CookieService from "@/services/CookieService";
import { LogOutIcon } from "lucide-react";

const UserMenu = () => {
  const handleLogout = () => {
    CookieService.remove("refresh");
    CookieService.remove("access");
    setTimeout(() => {
      location.replace("/");
    }, 1000);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex justify-center items-center space-x-3 cursor-pointer pl-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-third">
              <img
                src={"/user.png"}
                alt="user image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-semibold text-lg">
              <div className="cursor-pointer">admin</div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <button onClick={handleLogout} className="flex items-center gap-2">
              <LogOutIcon />
              <span className="font-medium">Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserMenu;
