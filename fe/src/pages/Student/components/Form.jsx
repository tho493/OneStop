import { Button, DatePicker, Form, Input, Space } from "antd";
import { useEffect } from "react";
import moment from "moment";

const FormStudent = (props) => {
  const { studentId, onFinish } = props;  
  const [form] = Form.useForm();

  useEffect(() => {
    if (studentId) {
      form.setFieldsValue({
        ...studentId,
        date_of_birth: studentId.date_of_birth ? moment(studentId.date_of_birth, "YYYY-MM-DD") : null, 
      });
    }
  }, [studentId, form]);

  return (
    <div className="mt-2">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          name="student_id"
          label="Mã Sinh Viên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="full_name"
          label="Họ Tên"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="address"
          label="Địa Chỉ"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone_number"
          label="Số Điện Thoại"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="w-full block"
          name="date_of_birth"
          label="Ngày Sinh"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button htmlType="submit">Submit</Button>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormStudent;
