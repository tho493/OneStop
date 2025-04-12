import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Upload } from "antd";

const FormDocument = (props) => {
  const { onFinish, form, normFile } = props;

  return (
    <div className="mt-2">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        {/* Tên tài liệu */}
        <Form.Item
          name="file_name"
          label="Tên tài liệu"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên tài liệu!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* File tải lên */}
        <Form.Item label="File hướng dẫn">
          <Form.Item
            name="file_path"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[
              {
                required: true,
                message: "Vui lòng tải lên ít nhất một file!",
              },
            ]}
          >
            <Upload.Dragger
              name="file_path"
              multiple={false}
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Nhấp hoặc kéo tệp vào đây để tải lên
              </p>
              <p className="ant-upload-hint">Chỉ có thể tải lên một file.</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        {/* Nút Submit và Reset */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button htmlType="reset" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormDocument;
