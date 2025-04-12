import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCategoryTypeById } from "../../services/CategoryTypeServices";
import { Button, Form, Input, message, Upload } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { getDocumentById } from "../../services/DocumentServices";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux-tookit/authSlice";
import { postTypeItem } from "../../services/TypeItemServices";

const Detail = () => {
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");
  const [typeData, setTypeData] = useState({});
  const [documentData, setDocumentData] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTypeData = async () => {
      const getTypeId = await getCategoryTypeById(id);
      setTypeData(getTypeId);
      dispatch(getInfoUser());
    };
    fetchTypeData();
  }, [id, dispatch]);

  useEffect(() => {
    if (typeData?.document_id) {
      const fetchDocumentData = async () => {
        const getDocumentId = await getDocumentById(typeData.document_id);
        setDocumentData(getDocumentId);
      };
      fetchDocumentData();
    }
  }, [typeData]);

  useEffect(() => {
    if (user?.user?.id && typeData?.loai_yeu_cau_id) {
      form.setFieldsValue({
        loai_yeu_cau_id: typeData.loai_yeu_cau_id,
        student_id: user.user.id,
      });
    }
  }, [user, typeData, form]);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList || [];
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("loai_yeu_cau_id", values.loai_yeu_cau_id);
    formData.append("student_id", values.student_id);
    formData.append("message", values.message);
  
    if (values.fileStudent && values.fileStudent.length > 0) {
      formData.append("fileStudent", values.fileStudent[0].originFileObj);
    }

    console.log("FormData:", Array.from(formData.entries()));

  
    try {
      const response = await postTypeItem(formData);
      if (response) {
        message.success("Nộp hồ sơ thành công");
        navigate('/main')
      } else {
        message.error("Nộp hồ sơ thất bại");
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi gửi dữ liệu");
      console.error("Lỗi:", error);
    }
  };

  

  return (
    <div className="w-full max-w-[1200px] mx-auto my-8 p-6 bg-white shadow-md rounded-lg">
      {/* Tiêu đề */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Chi Tiết Thủ Tục</h1>
        <p className="text-gray-600">
          Dưới đây là thông tin chi tiết về thủ tục. Vui lòng kiểm tra và thực
          hiện theo hướng dẫn.
        </p>
      </div>

      {/* Thông tin chung */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Thông Tin Chung
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium text-gray-700">Lĩnh vực:</p>
            <p className="text-gray-600">Đào tạo Quốc tế</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Tên thủ tục:</p>
            <p className="text-gray-600">Quy trình: {typeData.ten_loai}</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Cấp tiếp nhận:</p>
            <p className="text-gray-600">Cơ quan chuyên môn</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Cơ quan tiếp nhận:</p>
            <p className="text-gray-600">Trường Đại học Sao Đỏ</p>
          </div>
          <div>
            <p className="font-medium text-gray-700">Hình thức nộp</p>
            <p className="text-gray-600">Nộp qua mạng</p>
          </div>
        </div>
      </div>

      {/* Thành phần hồ sơ */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Thành Phần Hồ Sơ
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                STT
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Tên giấy tờ
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Bản chính
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Bản sao
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Bắt buộc
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">
                Xuất trình thẻ sinh viên hoặc chứng minh thư nhân dân
              </td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">0</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input type="checkbox" checked disabled />
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2">2</td>
              <td className="border border-gray-300 px-4 py-2">
                Mẫu đơn xin: {typeData.ten_loai}
                <br />
                <a
                  href={`http://localhost:3000/api/documents/download/${documentData.document_id}`}
                  className="text-blue-500 underline cursor-pointer"
                >
                  {documentData.file_name}.docx
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2">1</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <input type="checkbox" checked disabled />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Form điền thông tin */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
          Nhập thông tin
        </h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="grid grid-cols-2 gap-4"
        >
          <Form.Item
            hidden
            label="Loại yêu cầu"
            name="loai_yeu_cau_id"
            className="col-span-2"
          >
            <Input
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </Form.Item>

          <Form.Item
            label="Mã sinh viên"
            name="student_id"
            className="col-span-2"
          >
            <Input
              disabled
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </Form.Item>

          <Form.Item label="Ghi chú" name="message" className="col-span-2">
            <Input.TextArea
              rows={4}
              placeholder="Nhập ghi chú (nếu có)"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </Form.Item>

          {/* File tải lên */}
          <Form.Item
            name="fileStudent"
            label="Tải hồ sơ"
            valuePropName="fileList"  
            getValueFromEvent={normFile}
            
          >
            <Upload name="fileStudent" action="http://localhost:3000/api/yeu-cau/uploads/" listType="picture">
              <Button icon={<UploadOutlined />}>Chọn tệp tải lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="col-span-2 flex justify-end">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
            >
              Nộp Hồ Sơ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Detail;
