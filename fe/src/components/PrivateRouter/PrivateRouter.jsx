import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ allowedRoles }) => {
  const { isAuthenticated, type } = useSelector((state) => state.auth);

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Nếu vai trò không được phép, chuyển hướng đến trang phù hợp
  if (!allowedRoles.includes(type)) {
    return type === "admin" ? <Navigate to="/admin" /> : <Navigate to="/" />;
  }

  // Nếu hợp lệ, hiển thị nội dung của route
  return <Outlet />;
};

export default PrivateRouter;