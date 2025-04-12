import React, { useState } from "react";
import { Button, Form, Input, DatePicker, message, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { saveAs } from "file-saver";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  TabStopType,
  TabStopPosition,
} from "docx";
import { motion } from "framer-motion";


const CreateWord = () => {
  const pageVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    try {
      // Format data for Word document
      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                size: {
                  orientation: "portrait", // Hướng dọc
                  width: 11906, // Kích thước A4 (8.27 inches)
                  height: 16838, // Kích thước A4 (11.69 inches)
                },
                margin: {
                  top: 1440, // 1 inch
                  bottom: 1440, // 1 inch
                  left: 1440, // 1 inch
                  right: 1440, // 1 inch
                },
              },
            },
            children: [
              // Header
              new Paragraph({
                children: [
                  new TextRun({
                    text: "BỘ GIÁO DỤC VÀ ĐÀO TẠO",
                    bold: true,
                    size: 24,
                  }),
                  new TextRun({
                    text: "\nTRƯỜNG ĐẠI HỌC XYZ",
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM",
                    bold: true,
                    allCaps: true,
                    size: 28,
                  }),
                  new TextRun({
                    text: "\nĐộc lập - Tự do - Hạnh phúc",
                    bold: true,
                    size: 24,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: "ĐƠN XIN HỖ TRỢ",
                bold: true,
                allCaps: true,
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
                size: 28,
              }),
              // Kính gửi
              new Paragraph({
                text: "Kính gửi: Ban Giám hiệu - Trường Đại học XYZ",
                alignment: AlignmentType.LEFT,
                spacing: { after: 200 },
              }),
              // Chuyên ngành
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Chuyên ngành: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: "................................................................................................................",
                  }),
                ],
                spacing: { after: 200 },
              }),
              // Thông tin cá nhân
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Tên tôi là: ",
                  }),
                  new TextRun({
                    text: `${values.fullName}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: " ................................................................................................................",
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Sinh ngày: ",
                  }),
                  new TextRun({
                    text: `${values.birthDate.format("DD/MM/YYYY")}`,
                    bold: true,
                  }),
                  new TextRun({
                    text: " ............................................................",
                  }),
                  new TextRun({
                    text: " Nơi sinh: ",
                    bold: true,
                  }),
                  new TextRun({
                    text: " ...........................................................",
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Hộ khẩu thường trú: ",
                  }),
                  new TextRun({
                    text: "................................................................................................................",
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Mã số sinh viên: ",
                  }),
                  new TextRun({
                    text: "................................................................................................................",
                  }),
                ],
                spacing: { after: 200 },
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Hiện đang học lớp: ",
                  }),
                  new TextRun({
                    text: "....................",
                  }),
                  new TextRun({
                    text: " Khóa: ",
                  }),
                  new TextRun({
                    text: "............",
                  }),
                  new TextRun({
                    text: " Hệ đào tạo chính quy",
                  }),
                ],
                spacing: { after: 200 },
              }),
              // Nội dung yêu cầu
              new Paragraph({
                text: `Nội dung yêu cầu: ${values.requestContent}`,
                alignment: AlignmentType.LEFT,
                spacing: { after: 400 },
              }),
              // Cam kết
              new Paragraph({
                text: "Tôi xin cam kết các thông tin trên là đúng sự thật.",
                alignment: AlignmentType.LEFT,
                spacing: { after: 400 },
              }),
              // Ngày tháng và chữ ký
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Hà Nội, ngày .... tháng .... năm 20....",
                    italics: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { after: 200 },
              }),
              new Paragraph({
                text: "Người làm đơn",
                alignment: AlignmentType.RIGHT,
                spacing: { after: 100 },
              }),
              new Paragraph({
                text: "(Ký tên và ghi rõ họ tên)",
                alignment: AlignmentType.RIGHT,
              }),
            ],
          },
        ],
      });
  
      // Generate Word file
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `HoSoYeuCau_${values.studentId}.docx`);
      message.success("Hồ sơ đã được tạo và tải xuống thành công!");
    } catch (error) {
      console.error("Error generating Word file:", error);
      message.error("Đã xảy ra lỗi khi tạo hồ sơ.");
    }
  };
  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient nền
        padding: "20px",
      }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          background: "#fff",
          padding: 32,
          borderRadius: 16, // Bo góc form
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Bóng đổ
          border: "1px solid #ddd", // Viền form
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 24,
            color: "#6a11cb", // Màu tiêu đề
          }}
        >
          Tạo Hồ Sơ Yêu Cầu
        </h1>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontWeight: "bold", color: "#333" }}>Họ và tên</span>}
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
              >
                <Input
                  placeholder="Nhập họ và tên"
                  style={{
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontWeight: "bold", color: "#333" }}>Ngày sinh</span>}
                name="birthDate"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontWeight: "bold", color: "#333" }}>Mã số sinh viên</span>}
                name="studentId"
                rules={[{ required: true, message: "Vui lòng nhập mã số sinh viên!" }]}
              >
                <Input
                  placeholder="Nhập mã số sinh viên"
                  style={{
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontWeight: "bold", color: "#333" }}>Lớp</span>}
                name="className"
                rules={[{ required: true, message: "Vui lòng nhập lớp!" }]}
              >
                <Input
                  placeholder="Nhập lớp"
                  style={{
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    padding: "10px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
  
          <Form.Item
            label={<span style={{ fontWeight: "bold", color: "#333" }}>Hộ khẩu thường trú</span>}
            name="address"
            rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
          >
            <Input
              placeholder="Nhập địa chỉ thường trú"
              style={{
                borderRadius: 8,
                border: "1px solid #ddd",
                padding: "10px",
              }}
            />
          </Form.Item>
  
          <Form.Item
            label={<span style={{ fontWeight: "bold", color: "#333" }}>Nội dung yêu cầu</span>}
            name="requestContent"
            rules={[{ required: true, message: "Vui lòng nhập nội dung yêu cầu!" }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Nhập nội dung yêu cầu"
              style={{
                borderRadius: 8,
                border: "1px solid #ddd",
                padding: "10px",
              }}
            />
          </Form.Item>
  
          <Form.Item label={<span style={{ fontWeight: "bold", color: "#333" }}>Ảnh căn cước công dân</span>}>
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleUpload}
              beforeUpload={() => false}
            >
              <Button
                icon={<UploadOutlined />}
                style={{
                  background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                Tải lên ảnh
              </Button>
            </Upload>
          </Form.Item>
  
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{
                background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Tạo Hồ Sơ
            </Button>
          </Form.Item>
        </Form>
      </div>
    </motion.div>
  );
};

export default CreateWord;
