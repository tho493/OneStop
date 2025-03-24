import {
  AppstoreOutlined,
  LogoutOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const items = [
    {
      key: "document",
      label: "Quản lý hồ sơ",
      icon: <MailOutlined />,
      children: [
        {
          key: "document-list",
          label: <Link to="/admin">Dữ liệu hồ sơ</Link>,
        },
        {
          key: "document-create",
          label: <Link to="/admin/document/create">Thêm hồ sơ</Link>,
        },
      ],
    },
    {
      key: "student",
      label: "Quản lý sinh viên",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "student-list",
          label: <Link to="/admin/student">Dữ liệu sinh viên</Link>,
        },
        {
          key: "student-create",
          label: <Link to="/admin/student/create">Thêm sinh viên</Link>,
        },
      ],
    },
    {
      key: "option",
      label: "Tùy chọn",
      type: "group",
      children: [
        {
          key: "setting",
          label: "Setting",
          icon: <SettingOutlined />,
        },
        {
          key: "logout",
          label: "Logout",
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div className="w-[300px] h-screen overflow-y-hidden">
      <div className="m-2 text-center text-2xl font-bold">
        <span>Logo</span>  
      </div>  
      <Menu
        className="h-full overflow-y-auto"
        onClick={onClick}
        mode="inline"
        items={items}
        defaultOpenKeys={["document"]}
        defaultSelectedKeys={["document-list"]}
        theme={theme}
      />
    </div>
  );
};

export default Sidebar;
