import "../../App.css";
import { Input } from "antd";
import { useEffect, useState } from "react";
import Toggle from "../Toggle/Toggle";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux-tookit/themeSlice";
import { checkAuth } from "../../redux-tookit/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const { Search } = Input;

const HeaderDashboard = () => {
  // State loading cho tìm kiếm
  const [load, setLoad] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  // Lấy thông tin từ Redux
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      message.success(location.state.successMessage);
    }
  }, [location]);

  useEffect(() => {
    const checkAuthentication = async () => {
      await dispatch(checkAuth());
      setIsAuthChecked(true); // Đánh dấu xác thực đã hoàn tất
    };
    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthChecked, navigate]);

  // Xử lý toggle theme
  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center justify-between px-6 h-15 w-full">
      {/* Thanh tìm kiếm */}
      <div className="w-2/8">
        
      </div>
      {/* Nút toggle theme */}
      <div className="flex-1 text-right mb-4">
        <Toggle onClick={handleToggle} />
      </div>
    </div>
  );
};

export default HeaderDashboard;