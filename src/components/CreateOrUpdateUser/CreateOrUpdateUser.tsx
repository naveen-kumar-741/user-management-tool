import React, { useEffect, useState } from "react";
import {
  CreateOrUpdateUserProps,
  UserDataType,
} from "../../interfaces/interfaces";
import { Button, Form, FormProps, Input, Modal } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { createUserThunk, updateUserThunk } from "../../slices/thunks";

const CreateOrUpdateUser: React.FC<CreateOrUpdateUserProps> = ({
  userData,
  show,
  setShow,
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setShow(false);
  };

  const handleEditOrCreate: FormProps<UserDataType>["onFinish"] = async (
    value: UserDataType
  ) => {
    setLoading(true);
    if (userData) {
      const status = await dispatch(
        updateUserThunk({ userId: userData.id, updatedData: value })
      );
      console.log("status", status);

      if (status.type === "users/updateUser/fulfilled") {
        setLoading(false);
        setShow(false);
      }
    } else {
      const status = await dispatch(createUserThunk({ userData: value }));
      console.log("status", status);

      if (status.type === "users/createUser/fulfilled") {
        setLoading(false);
        setShow(false);
      }
    }
    console.log("value", value);
  };

  useEffect(() => {
    if (userData) {
      form.setFieldsValue({ ...userData });
    }
  }, [userData, form]);

  return (
    <Modal
      centered={true}
      open={show}
      title={userData === undefined ? "Create New User" : "Edit User"}
      onOk={form.submit}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={form.submit}
        >
          Submit
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" onFinish={handleEditOrCreate}>
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Enter your email Id" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Enter your email Id" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Enter your email Id" />
        </Form.Item>
        <Form.Item
          label="Profile Image Link"
          name="avatar"
          rules={[{ required: true }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input placeholder="Enter your email Id" />
        </Form.Item>
      </Form>
      {/* {error && <span className={styles.formError}>{error}</span>} */}
    </Modal>
  );
};

export default CreateOrUpdateUser;
