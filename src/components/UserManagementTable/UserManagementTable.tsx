import React, { useMemo, useState } from "react";
import { Button, Image, Space, Table, TableProps } from "antd";
import { UserDataType } from "../../interfaces/interfaces";
import { users } from "../../slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CreateOrUpdateUser from "../CreateOrUpdateUser/CreateOrUpdateUser";
import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import { deleteUserThunk } from "../../slices/thunks";

const UserManagementTable: React.FC = () => {
  const columnsTemplate: TableProps<UserDataType>["columns"] = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Image
            width={40}
            style={{ borderRadius: "50%" }}
            src={record.avatar}
          />
        </div>
      ),
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      render: (_, record) => (
        <span style={{ color: "#1677ff" }}>{record.email}</span>
      ),
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      width: "20%",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      width: "20%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            style={{ borderRadius: "4px" }}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            style={{ borderRadius: "4px" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
      width: "20%",
    },
  ];
  const { usersList, status } = useAppSelector(users);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType>();

  const handleEdit = (id: number) => {
    setShow(true);
    setUserData(usersList.find((user) => user.id === id));
  };

  const handleDelete = (id: number) => {
    setShowConfirm(true);
    setUserData(usersList.find((user) => user.id === id));
  };

  const onConfirmDelete = async () => {
    setLoading(true);
    if (userData?.id) {
      await dispatch(deleteUserThunk(userData?.id));
    }
    onClose();
  };

  const onClose = () => {
    setShowConfirm(false);
    setLoading(false);
  };

  const dataSource = useMemo(
    () =>
      usersList.map((user) => ({
        ...user,
        key: user.id,
      })),
    [usersList]
  );

  return (
    <React.Fragment>
      <Table<UserDataType>
        style={{ overflow: "auto" }}
        columns={columnsTemplate}
        dataSource={dataSource ?? []}
        loading={status === "loading"}
        pagination={false}
      />
      <CreateOrUpdateUser show={show} setShow={setShow} userData={userData} />
      <ConfirmationPopUp
        show={showConfirm}
        onClose={onClose}
        onConfirm={onConfirmDelete}
        loading={loading}
      />
    </React.Fragment>
  );
};

export default UserManagementTable;
