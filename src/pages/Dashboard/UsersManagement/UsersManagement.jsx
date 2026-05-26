import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UsersManagement = () => {
  const { user } = useAuth();
const axiosSecure = useAxiosSecure()

const {data: users =[]}= useQuery({
    queryKey:["users"],
    queryFn: async()=>{
        const res = await axiosSecure.get("/users")
        return res.data;
    }
})

  return <div>UsersManagement{users.length}
  
  </div>;
};

export default UsersManagement;
