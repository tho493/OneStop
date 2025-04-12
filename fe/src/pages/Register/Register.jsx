import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ButtonHover from "../../components/ButtonHover/ButtonHover";
import CarAnimation from "../../components/CarAnimation/CarAnimation";

const Register = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen overflow-x-auto overflow-y-auto bg-[#717c9f]">
      <div className="w-[1000px] h-[575px] rounded-[6px] overflow-hidden shadow-lg flex">
        <div className="w-[40%] bg-[#4b4475] p-10 flex flex-col items-center justify-center gap-y-4">
          <img
            src="/Logo.png"
            alt="Logo"
            width={250}
            height={200}
          />
          <CarAnimation />
        </div>
        <div className="w-[60%] bg-[#ffba32] p-10">
          <Link to={"/login"} className="text-white cursor-pointer hover:text-orange-900 transition-all duration-300">
            <ArrowLeftOutlined className="mr-2" />
            Trở lại
          </Link>
          <div className="w-[500px] h-[440px] mx-auto rounded-[6px] bg-white shadow-lg mt-6 px-10 py-8">
            <div className="flex items-center justify-between py-4">
              <span className="text-[#ffba32] font-bold text-xl">
                Tạo tài khoản
              </span>
              <Link to={"/login"} className="cursor-pointer hover:text-orange-900 transition-all duration-300">
                <UserOutlined className="mr-2" />
                Đăng nhập
              </Link>
            </div>
            {/* Form */}
            <Form layout="vertical">
              <Form.Item label="Họ và tên">
                <Input placeholder="Quang Nghĩa" />
              </Form.Item>
              <Form.Item label="Tên đăng nhập">
                <Input placeholder="quangnghia273" />
              </Form.Item>
              <Form.Item label="Mật khẩu">
                <Input.Password
                  placeholder="••••••••"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <ButtonHover title={"Đăng ký"} />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
