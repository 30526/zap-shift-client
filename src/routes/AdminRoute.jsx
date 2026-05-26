import React from "react";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";
import useRole from "../hooks/useRole";
import ForbiddenPage from "../components/Forbidden/ForbiddenPage";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <ForbiddenPage></ForbiddenPage>;
  }
  return children;
};

export default AdminRoute;
