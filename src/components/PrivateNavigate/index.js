import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

export default function PrivateNavigate() {
  const isLogin = getCookie("token");
  return isLogin ? <Outlet /> : <Navigate to="/login" />;
}
