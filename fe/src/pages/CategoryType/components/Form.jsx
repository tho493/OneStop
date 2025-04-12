import { Button, Form, Input, Select } from "antd";
import { useEffect } from "react";
const FormCategoryType = (props) => {
  const { documents, onFinish, categoryTypeId } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if(categoryTypeId) {
        form.setFieldsValue({...categoryTypeId});
    }
  }, [categoryTypeId])
  return (
    <div className="mt-2">
      <Form
        form={form}
        name="basic"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tên yêu cầu"
          name="ten_loai"
          rules={[{ required: true, message: "Vui lòng nhập tên yêu cầu!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tài liệu"
          name="document_id"
          rules={[{ required: true, message: "Vui lòng chọn file!" }]}
        >
          <Select placeholder="Chọn tài liệu">
            {documents.map((item, index) => (
              <Select.Option key={index} value={item.document_id}>
                {item.file_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCategoryType;
