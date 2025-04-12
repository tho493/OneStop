import { message } from "antd";
import { createStudent } from "../../../services/StudentServices";
import { useNavigate } from "react-router-dom";
import FormStudent from "./Form";

const StudentCreate = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      date_of_birth: values.date_of_birth.format("YYYY-MM-DD"),
    };
    const response = await createStudent(formattedValues);
    if (response) {
      message.success("Thêm sinh viên thành công!");
      navigate("/admin/student");
    } else {
      message.error("Thêm sinh viên thất bại!");
    }
  };
  return (
    <div className="mt-10 mx-6">
      <h1 className="text-3xl font-bold text-orange-400">Thêm Sinh Viên</h1>
      <FormStudent onFinish={onFinish}/>
    </div>
  );
};

export default StudentCreate;
