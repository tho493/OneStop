import { Form, Input, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import ButtonHover from "../../components/ButtonHover/ButtonHover";
import CarAnimation from "../../components/CarAnimation/CarAnimation";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, loginAuth } from "../../redux-tookit/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, type } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (type === "admin") {
        navigate("/admin");
      } else if (type === "user") {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate, type]);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    dispatch(loginAuth({ params: values, messageApi, navigate }));
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-[#4b4475] to-[#717c9f]">
        <div className="w-full max-w-[900px] h-auto lg:h-[550px] rounded-lg overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* Logo Section */}
          <div className="w-full lg:w-[40%] bg-[#4b4475] p-10 flex flex-col items-center justify-center gap-y-6">
            <img
              src="/Logo.png"
              alt="Logo"
              className="w-[200px] h-auto lg:w-[250px]"
            />
            <CarAnimation />
            <p className="text-white text-center text-sm lg:text-base">
              Chào mừng bạn đến với hệ thống quản lý của Đại học Sao Đỏ. Hãy
              đăng nhập để tiếp tục.
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full lg:w-[60%] bg-[#ffba32] p-6 lg:p-10 flex items-center justify-center">
            <div className="w-full max-w-[400px] bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h2 className="text-center text-[#ffba32] font-bold text-2xl mb-6">
                Đăng nhập
              </h2>
              <Form
                className="flex flex-col gap-y-5"
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  label="Mã sinh viên"
                  rules={[
                    { required: true, message: "Vui lòng nhập mã sinh viên!" },
                  ]}
                >
                  <Input placeholder="2100952" />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu!" },
                  ]}
                >
                  <Input.Password
                    placeholder="••••••••"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                </Form.Item>
                <ButtonHover title={"Đăng nhập"} />
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;