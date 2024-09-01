import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ErrorHandler from "../components/errors/ErrorHandler";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import SignUp from "../pages/forms/SignUp";
import SignIn from "../pages/forms/SignIn";
import PageNotFound from "@/pages/not found/PageNotFound";
import Tenants from "@/pages/dashboard/Tenants";
import DashboardLayout from "@/layout/DashboardLayout";
import CookieService from "@/services/CookieService";
import Properties from "@/pages/dashboard/Properties";
import Payements from "@/pages/dashboard/Payement";

const isAllowed =
  CookieService.get("refresh") && CookieService.get("access") && true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/signUp"
        element={
          <ProtectedRoute isAllowed={!isAllowed} redirectedPath="/">
            <SignUp />
          </ProtectedRoute>
        }
        errorElement={<ErrorHandler />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={!isAllowed} redirectedPath="/properties">
            <SignIn />
          </ProtectedRoute>
        }
        errorElement={<ErrorHandler />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={isAllowed} redirectedPath="/properties">
            <DashboardLayout />
          </ProtectedRoute>
        }
        errorElement={<ErrorHandler />}
      > 
        <Route index path="properties" element={<Properties />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="payments" element={<Payements />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
