// import { Button, Form, Input, message, Select } from "antd";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import {
//   editTypeItem,
//   getTypeItemById,
// } from "../../../services/TypeItemServices";
// import FormTypeItem from "./Form";
// import { getAllCategoryType } from "../../../redux-tookit/categoryTypeSlice";
// import { getAllStudents } from "../../../redux-tookit/studentSlice";

// const TypeItemEdit = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [typeItemId, setTypeItemId] = useState();
//   const id = searchParams.get("id");
//   const { categoryTypes } = useSelector((state) => state.categoryType);
//   const { students } = useSelector((state) => state.student);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllCategoryType());
//     dispatch(getAllStudents());
//   }, [dispatch]);

//   useEffect(() => {
//     const getTypeItemId = async () => {
//       const response = await getTypeItemById(id);
//       setTypeItemId(response);
//     };
//     getTypeItemId();
//   }, []);

//   const onFinish = async (values) => {
//     console.log(values)
//     const response = await editTypeItem(values, id);
//     if(response) {
//       message.success("Cập nhật yêu cầu thành công");
//       navigate('/admin/type-item')
//     } else {
//       message.error("Cập nhật yêu cầu thất bại");
//     }
//   };

//   return (
//     <div className="mt-10 mx-6">
//       <h1 className="text-3xl font-bold text-orange-400">Sửa yêu cầu</h1>
//       <FormTypeItem categoryTypes={categoryTypes} students={students} typeItemId={typeItemId} onFinish={onFinish} />
//     </div>
//   );
// };

// export default TypeItemEdit;
