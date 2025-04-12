import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Nếu đã đăng nhập, chuyển hướng đến trang khác
  if (isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  // Nếu chưa đăng nhập, hiển thị nội dung của route
  return children;
};

export default ProtectedRoute;