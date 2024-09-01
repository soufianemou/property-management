import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Iprops {
  isAllowed: boolean;
  redirectedPath: string;
  children: ReactNode;
  data?: unknown;
}
const ProtectedRoute = ({
  isAllowed,
  redirectedPath,
  children,
  data,
}: Iprops) => {
  if (!isAllowed) return <Navigate to={redirectedPath} replace state={data} />;
  return children;
};

export default ProtectedRoute;
