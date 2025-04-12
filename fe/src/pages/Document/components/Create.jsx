import { Form, message } from "antd";
import { createDocument } from "../../../services/DocumentServices";
import FormDocument from "./Form";
import { useNavigate } from "react-router-dom";

const DocumentCreate = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
      const formData = new FormData();

      formData.append("document_name", values.file_name); 

      if (values.file_path && values.file_path.length > 0) {
        formData.append("document", values.file_path[0].originFileObj); 
      } else {
        message.error("Vui lòng tải lên một file!");
        return;
      }

      // console.log("FormData:", Array.from(formData.entries()));

      const response = await createDocument(formData);

      if (response) {
        message.success("Tải lên thành công!");
        navigate('/admin/')
      } else {
        message.error("Tải lên thất bại!");
      }

  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  return (
    <div className="mt-10 mx-6">
      <h1 className="text-3xl font-bold text-orange-300">Thêm tài liệu</h1>
      <FormDocument onFinish={onFinish} form={form} normFile={normFile} />
    </div>
  );
};

export default DocumentCreate;