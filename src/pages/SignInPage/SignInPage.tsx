import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, FormProps, Input } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { auth, clearError, loginUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./SignInPage.module.scss";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const SignInPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(auth);
  const navigate = useNavigate();

  const handleLogin: FormProps<FieldType>["onFinish"] = async (values) => {
    const { remember, ...rest } = values;
    const status = await dispatch(loginUser(rest));
    if (status.type === "auth/loginUser/fulfilled") {
      navigate("/user-management");
    }
  };

  return (
    <main className={styles.signInPage}>
      <Form
        className={styles.signInForm}
        name="signIn"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        onChange={() => dispatch(clearError())}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email Id!",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please Enter a valid email Id!",
            },
          ]}
        >
          <Input placeholder="Enter your email Id" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            {
              min: 8,
              message: "Password must be at least 8 characters",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter your password"
            prefix={<LockOutlined />}
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          label={null}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {error && <span className={styles.formError}>{error}</span>}
        <Form.Item label={null}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitBtn}
            loading={status === "loading"}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </main>
  );
};

export default SignInPage;
