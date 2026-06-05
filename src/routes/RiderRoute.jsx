import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import ForbiddenPage from "../components/Forbidden/ForbiddenPage";

const RiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { isLoading, role } = useRole();

  if (loading || isLoading) {
    return <Loading></Loading>;
  }

  if (role !== "rider") {
    return <ForbiddenPage></ForbiddenPage>;
  }

  return children;
};

export default RiderRoute;
