import {
  FileDoneOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { PiStudent } from "react-icons/pi";
import { IoIosGitPullRequest } from "react-icons/io";
import { LuGitPullRequest } from "react-icons/lu";

const Sidebar = () => {
  const theme = useSelector((state) => state.theme.theme);
  const items = [
    {
      key: "document",
      label: "Quản lý tài liệu",
      icon: <FileDoneOutlined />,
      children: [
        {
          key: "document-list",
          label: <Link to="/admin">Danh sách tài liệu</Link>,
        },
        {
          key: "document-create",
          label: <Link to="/admin/document/create">Thêm tài liệu</Link>,
        },
      ],
    },
    {
      key: "student",
      label: "Quản lý sinh viên",
      icon: <PiStudent />,
      children: [
        {
          key: "student-list",
          label: <Link to="/admin/student">Dữ liệu sinh viên</Link>,
        },
        {
          key: "students-create",
          label: <Link to="/admin/student/create">Thêm sinh viên</Link>,
        },
      ],
    },
    {
      key: "categoryType",
      label: "Quản lý loại yêu cầu",
      icon: <IoIosGitPullRequest />,
      children: [
        {
          key: "categoryType-list",
          label: <Link to="/admin/category-type">Danh sách loại yêu cầu</Link>,
        },
        {
          key: "categoryType-create",
          label: <Link to="/admin/category-type/create">Thêm loại yêu cầu</Link>,
        },
      ],
    },
    {
      key: "typeItem",
      label: "Quản lý yêu cầu",
      icon: <LuGitPullRequest />,
      children: [
        {
          key: "typeItem-list",
          label: <Link to="/admin/type-item">Danh sách yêu cầu</Link>,
        },
        // {
        //   key: "typeItem-create",
        //   label: <Link to="/admin/type-item/create">Thêm yêu cầu</Link>,
        // },
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
          label: <Logout />,
        },
      ],
    },
  ];

  return (
    <div className="w-[300px] h-screen overflow-y-hidden">
      <div className="m-2 text-center text-2xl font-bold flex justify-center items-center">
        <img src="./Logo.png" alt="logo-dashboard" className="w-[100px] h-[100px]" /> 
      </div>  
      <Menu
        className="h-full overflow-y-auto"
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
