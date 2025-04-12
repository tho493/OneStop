// import { Form, message } from "antd";
// import { editDocument, getDocumentById } from "../../../services/DocumentServices";
// import FormDocument from "./Form";
// import { useSearchParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const DocumentEdit = () => {
//     const [searchParams] = useSearchParams();
//     const id = searchParams.get("id");
//     const [documents, setDocuments] = useState();
    
//     useEffect(() => {
//         const getDocumentId = async () => {
//             const response = await getDocumentById(id);
//             setDocuments(response)
//         }

//         getDocumentId()
//     }, [])

//   const [form] = Form.useForm();

//   const onFinish = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("document_type", values.document_type);
//       formData.append("document_name", values.file_name);
//       if (values.file_path && values.file_path.length > 0) {
//         formData.append("document", values.file_path[0].originFileObj);
//       } else {
//         message.error("Vui lòng tải lên một file!");
//         return;
//       }

//       const response = await editDocument(formData);
//       message.success(response.message || "Tải lên thành công!");
//       form.resetFields();
//     } catch (error) {
//       console.error("Lỗi khi tải lên:", error.message);
//       message.error(error.message || "Đã xảy ra lỗi khi tải lên!");
//     }
//   };

//   // Hàm xử lý sự kiện upload file
//   const normFile = (e) => {
//     console.log("Upload event:", e);
//     if (Array.isArray(e)) {
//       return e;
//     }
//     return e?.fileList;
//   };
//   return (
//     <div className="mt-10 mx-6">
//       <h1 className="text-3xl font-bold text-orange-300">Sửa Hồ Sơ</h1>
//       <FormDocument onFinish={onFinish} form={form} normFile={normFile} documents={documents} />
//     </div>
//   );
// };

// export default DocumentEdit;
