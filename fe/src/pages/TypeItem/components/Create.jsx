// import { Button, Form, Input, message, Select } from "antd";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAllCategoryType } from "../../../redux-tookit/categoryTypeSlice";
// import { getAllStudents } from "../../../redux-tookit/studentSlice";
// import { postTypeAdmin, postTypeItem } from "../../../services/TypeItemServices";
// import FormTypeItem from "./Form";

// const TypeItemCreate = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { categoryTypes } = useSelector((state) => state.categoryType);
//   const { students } = useSelector((state) => state.student);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     dispatch(getAllCategoryType());
//     dispatch(getAllStudents());
//   }, []);

//   const onFinish = async (values) => {
//     console.log(values)
//     const response = await postTypeAdmin(values);
//     if(response) {
//       message.success("Thêm yêu cầu thành công");
//       navigate('/admin/type-item')
//     } else {
//       message.error("Thêm yêu cầu thất bại");
//     }
//   };

//   return (
//     <div className="mt-10 mx-6">
//       <h1 className="text-3xl font-bold text-orange-400">Thêm yêu cầu</h1>
//       <FormTypeItem categoryTypes={categoryTypes} students={students} form={form} onFinish={onFinish} />
//     </div>
//   );
// };

// export default TypeItemCreate;
