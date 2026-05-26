import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  FaEdit,
  FaTrash,
  FaUserShield,
  FaSearch,
  FaFilter,
} from "react-icons/fa";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Handle role change
  const handleRoleChange = (userId, currentRole) => {
    const newRole = currentRole === "admin" ? "user" : "admin";

    Swal.fire({
      title: "Change User Role?",
      html: `Change role to <span style="color: #03373d; font-weight: bold; font-size: 1.125rem;">${newRole.toUpperCase()}</span>?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#caeb66",
      cancelButtonColor: "#03373d",
      confirmButtonText:
        '<span style="color: #0b0b0b; font-weight: 600;">Yes, change it!</span>',
      cancelButtonText: '<span style="font-weight: 600;">Cancel</span>',
      iconColor: "#caeb66",
    }).then((result) => {
      if (result.isConfirmed) {
        // API call to update role
        axiosSecure
          .patch(`/users/${userId}`, { role: newRole })
          .then(() => {
            refetch();
            Swal.fire({
              title: "Updated!",
              text: "User role has been updated.",
              icon: "success",
              confirmButtonColor: "#caeb66",
              confirmButtonText:
                '<span style="color: #0b0b0b; font-weight: 600;">OK</span>',
              iconColor: "#caeb66",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to update user role.",
              icon: "error",
              confirmButtonColor: "#03373d",
            });
          });
      }
    });
  };

  // Handle delete user
  const handleDeleteUser = (userId, userName) => {
    Swal.fire({
      title: "Are you sure?",
      html: `Delete user <span style="color: #03373d; font-weight: bold;">${userName}</span>?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#03373d",
      confirmButtonText: '<span style="font-weight: 600;">Yes, delete!</span>',
      cancelButtonText: '<span style="font-weight: 600;">Cancel</span>',
    }).then((result) => {
      if (result.isConfirmed) {
        // API call to delete user
        axiosSecure
          .delete(`/users/${userId}`)
          .then(() => {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
              confirmButtonColor: "#caeb66",
              confirmButtonText:
                '<span style="color: #0b0b0b; font-weight: 600;">OK</span>',
              iconColor: "#caeb66",
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete user.",
              icon: "error",
              confirmButtonColor: "#03373d",
            });
          });
      }
    });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-secondary mb-2">
          Users Management
        </h1>
        <p className="text-accent">Manage all registered users</p>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Role Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <FaFilter className="text-gray-300" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="select select-bordered w-full md:w-48 border border-gray-200 focus:border-primary"
            >
              <option value="all">All Roles</option>
              <option value="user">Users</option>
              <option value="admin">Admins</option>
              <option value="rider">Rider</option>
            </select>
          </div>

          {/* Total Count */}
          <div className="bg-primary/10 px-4 py-2 rounded-lg">
            <span className="text-secondary font-semibold">
              Total Users: {filteredUsers.length}
            </span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">
                  Joined
                </th>
                <th className="text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr className="px-6 py-12">
                  <td colSpan="5" className="text-center py-12">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <FaSearch className="text-4xl mb-2" />
                      <p className="text-lg">No users found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((userData) => (
                  <tr
                    key={userData._id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    {/* User Info */}
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2">
                            {userData.photoURL ? (
                              <img
                                src={userData.photoURL}
                                alt={userData.displayName}
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary flex items-center justify-center">
                                <span className="text-black font-bold text-lg">
                                  {userData.displayName?.charAt(0) || "U"}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {userData.displayName || "No Name"}
                          </div>
                          <div className="text-sm text-gray-500 md:hidden">
                            {userData.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Email (Hidden on mobile) */}
                    <td className="hidden md:table-cell">
                      <div className="text-sm text-gray-600">
                        {userData.email}
                      </div>
                    </td>

                    {/* Role Badge */}
                    <td>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          userData.role === "admin"
                            ? "bg-primary text-black"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {userData.role === "admin" && <FaUserShield />}
                        {userData.role?.toUpperCase() || "USER"}
                      </span>
                    </td>

                    {/* Join Date (Hidden on mobile/tablet) */}
                    <td className="hidden lg:table-cell">
                      <div className="text-sm text-gray-600">
                        {formatDate(userData.createdAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-2">
                        {/* Make Admin/User Button */}
                        <button
                          onClick={() =>
                            handleRoleChange(userData._id, userData.role)
                          }
                          className={`btn btn-sm ${
                            userData.role === "admin"
                              ? "btn-outline border-gray-300 hover:bg-gray-100"
                              : "bg-primary hover:bg-primary/90 text-black border-0"
                          }`}
                          title={
                            userData.role === "admin"
                              ? "Remove Admin"
                              : "Make Admin"
                          }
                        >
                          <FaUserShield />
                          <span className="hidden sm:inline">
                            {userData.role === "admin"
                              ? "Remove"
                              : "Make Admin"}
                          </span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() =>
                            handleDeleteUser(userData._id, userData.displayName)
                          }
                          className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-0"
                          title="Delete User"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (Optional - Add if needed) */}
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredUsers.length} of {users.length} users
              </div>
              {/* Add pagination controls here if needed */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagement;
