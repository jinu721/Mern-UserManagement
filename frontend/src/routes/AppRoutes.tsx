import { Routes, Route,Navigate } from "react-router-dom";
import UserRegister from "../pages/user/Register";
import UserLogin from "../pages/user/Login";
import UserHome from "../pages/user/Home";
import AdminLogin from "../pages/admin/Login";
import AdminDashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../components/user/NotFound";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AppRoutes() {
  // const user = useSelector((state:any)=>state.user);
  return (
    <Routes>
      <Route path="/register" element={<UserRegister />} />
      <Route path="/login" element={<UserLogin />} />

      <Route element={<ProtectedRoute allowedRoles={["user", "admin"]} />}>
        <Route path="/" element={<UserHome />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
