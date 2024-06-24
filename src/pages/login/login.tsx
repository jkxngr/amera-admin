import { Button, Checkbox, Form, Input } from "antd";
import { saveState } from "../../lib/storage";
import { useNavigate } from "react-router-dom";
import { useLogin } from "./service/mutation/useLogin";
import "./login.scss";
type FieldType = {
  phone_number: string;
  password: string;
  remember: boolean;
};

export const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    const { phone_number, password, remember } = values;
    submit({ phone_number, password, remember });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const submit = (data: FieldType) => {
    mutate(data, {
      onSuccess: (data) => {
        saveState("user", data);
        navigate("/admin");
      },
    });
  };

  return (
    <section className="login">
      <div className="login2">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ phone_number: "+998977109944", password: 87654321 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Phone number"
            name="phone_number"
            rules={[{ required: true, message: "Please input your number!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
