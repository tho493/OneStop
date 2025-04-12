import { useNavigate, useSearchParams } from "react-router-dom";
import FormStudent from "./Form";
import { useEffect, useState } from "react";
import {
  editStudents,
  getStudentById,
} from "../../../services/StudentServices";
import { message } from "antd";

const StudentEdit = () => {
  const [studentId, setStudentId] = useState();
  const navigate = useNavigate();

  // get id student
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  // call api student id
  useEffect(() => {
    const fetchApiStudent = async () => {
      const response = await getStudentById(id);
      if (response) {
        setStudentId(response);
      } else {
        message.error("Lỗi không tìm thấy student_id");
      }
    };

    fetchApiStudent();
  }, []);

  const onFinish = async (values) => {
    const response = await editStudents(values, id);
    if (response) {
      message.success(`Cập nhật thành công student_id: ${id}`);
      navigate("/admin/student");
    } else {
      message.error("Cập nhật thất bại");
    }
  };
  return (
    <div className="mt-10 mx-6">
      <h1 className="text-3xl font-bold text-orange-400">Sửa Sinh Viên</h1>
      <FormStudent onFinish={onFinish} studentId={studentId} />
    </div>
  );
};

export default StudentEdit;
