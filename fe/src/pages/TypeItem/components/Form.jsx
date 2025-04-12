// import { Button, Form, Input, Select } from "antd";
// import { useEffect } from "react";

// const FormTypeItem = (props) => {
//   const { categoryTypes, students, onFinish, typeItemId } = props;
//   const [form] = Form.useForm();

//   useEffect(() => {
//     if (typeItemId) {
//       form.setFieldsValue({ ...typeItemId });
//     }
//   }, [typeItemId, form]);

//   return (
//     <div className="mt-2">
//       <Form
//         form={form}
//         name="basic"
//         layout="vertical"
//         initialValues={{ remember: true }}
//         onFinish={onFinish}
//       >
//         <Form.Item
//           label="Loại yêu cầu"
//           name="loai_yeu_cau_id"
//           rules={[{ required: true, message: "Vui lòng chọn loại yêu cầu!" }]}
//         >
//           <Select placeholder="Chọn loại yêu cầu">
//             {categoryTypes.map((item, index) => (
//               <Select.Option key={index} value={item.loai_yeu_cau_id}>
//                 {item.ten_loai}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Mã sinh viên"
//           name="student_id"
//           rules={[{ required: true, message: "Vui lòng chọn loại yêu cầu!" }]}
//         >
//           <Select placeholder="Chọn sinh viên">
//             {students.map((item, index) => (
//               <Select.Option key={index} value={item.student_id}>
//                 MSV:{item.student_id}, Họ tên: {item.full_name}
//               </Select.Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           label="Mô tả"
//           name="message"
//           rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           label="Trạng thái"
//           name="status"
//           rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
//         >
//           <Select placeholder="Chọn trạng thái">
//             <Select.Option key={1} value="pending">Chờ xét duyệt</Select.Option>
//             <Select.Option key={2} value="approved">Xét duyệt thành công</Select.Option>
//             <Select.Option key={3} value="rejected">Xét duyệt thất bại</Select.Option>
//           </Select>
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default FormTypeItem;