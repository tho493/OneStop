import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getInfoUser } from "../../redux-tookit/authSlice";
import { useEffect, useState } from "react";
import Logout from "../../components/Logout/Logout";
import { Link, useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      await dispatch(checkAuth());
      await dispatch(getInfoUser());
      setIsAuthChecked(true);
    };
    checkAuthentication();
  }, [dispatch]);

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthChecked, navigate]);

  const itemsUser = [
    {
      label: <Link to={'/info'}>Thông tin sinh viên</Link>,
      key: "info",
    },
    {
      label: <Logout />,
      key: "logout",
    },
  ];

  const itemsTab = [
    {
      label: <Link to={'/main'}>Hành chính một cửa</Link>,
      key: "support-main",
    },
    {
      label: <Link to={'/progress'}>Tiến trình xử lý hồ sơ</Link>,
      key: "progress-main",
    },
  ];

  const nameStudents = user?.user?.id;

  return (
    <header className="bg-blue-600 text-white">
      {/* Top Section */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <img
            className="w-16 h-16"
            src="/Logo.png"
            alt="Logo"
          />
          <div className="ml-4">
            <h1 className="text-xl font-bold">ĐẠI HỌC SAO ĐỎ</h1>
            <h2 className="text-sm">SAO DO UNIVERSITY</h2>
          </div>
        </div>
        <div className="hidden md:flex flex-1 ml-[200px] items-center gap-6">
          <a href="/" className="hover:text-gray-300 cursor-pointer">Trang chủ</a>
          <a href="/introduce" className="hover:text-gray-300 cursor-pointer">Giới thiệu</a>
          <Dropdown menu={{ items: itemsTab }}>
            <a onClick={(e) => e.preventDefault()} className="hover:text-gray-300 cursor-pointer">
              <Space>
                Xử lý hồ sơ
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
          <a href="/create-pdf" className="hover:text-gray-300 cursor-pointer">Tạo hồ sơ</a>
        </div>
        <div className="hidden md:block">
          {user ? (
            <Dropdown.Button
              menu={{ items: itemsUser }}
              placement="bottom"
              icon={<DownOutlined />}
            >
              {nameStudents}
            </Dropdown.Button>
          ) : (
            <a href="/login" className="text-white px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-600">
              Đăng nhập
            </a>
          )}
        </div>
        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-white text-2xl"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuOutlined />
        </button>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <a href="/" className="block py-2 text-blue-600 hover:text-blue-800">Trang chủ</a>
        <a href="/introduce" className="block py-2 text-blue-600 hover:text-blue-800">Giới thiệu</a>
        <a href="/contact" className="block py-2 text-blue-600 hover:text-blue-800">Liên hệ</a>
        <Dropdown menu={{ items: itemsTab }}>
          <a onClick={(e) => e.preventDefault()} className="block py-2 text-blue-600 hover:text-blue-800">
            Xử lý hồ sơ
          </a>
        </Dropdown>
        {user ? (
          <Dropdown.Button
            menu={{ items: itemsUser }}
            placement="bottom"
            className="mt-4"
          >
            {nameStudents}
          </Dropdown.Button>
        ) : (
          <a href="/login" className="block mt-4 text-center text-white bg-blue-600 py-2 rounded hover:bg-blue-700">
            Đăng nhập
          </a>
        )}
      </Drawer>
    </header>
  );
};

export default HeaderMain;