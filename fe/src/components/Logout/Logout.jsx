import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };  
  return (
    <div onClick={handleLogout} className="flex items-center">
      <LogoutOutlined className="w-[20px] h-[20px]" />
      <span>Logout</span>
    </div>
  );
};

export default Logout;
