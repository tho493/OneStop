import { Button, Form, Input, Space } from "antd";

const DocumentCreate = () => {
  const [form] = Form.useForm();
  return (
    <div className="mt-10 mx-6">
      <h1 className="text-3xl font-bold text-orange-300">Thêm Hồ Sơ</h1>
      <div className="mt-2">
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button>Submit</Button>
              <Button htmlType="reset">Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default DocumentCreate;
