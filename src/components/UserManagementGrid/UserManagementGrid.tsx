import React, { useState } from "react";
import { Avatar, Card, Col, Empty, Row } from "antd";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { users } from "../../slices/usersSlice";
import { UserDataType } from "../../interfaces/interfaces";
import CreateOrUpdateUser from "../CreateOrUpdateUser/CreateOrUpdateUser";
import ConfirmationPopUp from "../ConfirmationPopUp/ConfirmationPopUp";
import { deleteUserThunk } from "../../slices/thunks";
import styles from "./UserManagementGrid.module.scss";

const UserManagementGrid: React.FC = () => {
  const { usersList } = useAppSelector(users);
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

  if (usersList.length === 0) {
    return (
      <Card>
        <Empty />
      </Card>
    );
  }

  return (
    <React.Fragment>
      <Row gutter={[16, 16]} style={{ padding: 20 }}>
        {usersList.map((user) => (
          <Col xs={24} sm={12} md={8} lg={8} key={user.id}>
            <div className={styles.userCardWrapper}>
              <Card
                className={styles.userCard}
                hoverable
                cover={
                  <Avatar
                    src={user.avatar}
                    size={80}
                    style={{
                      margin: "20px auto",
                      display: "block",
                      borderRadius: "50%",
                    }}
                  />
                }
              >
                <Card.Meta
                  title={user.first_name + " " + user.last_name}
                  description={user.email}
                  style={{ textAlign: "center" }}
                />
              </Card>
              <div className={styles.hoverIcons}>
                <EditOutlined
                  className={styles.editIcon}
                  onClick={() => handleEdit(user.id)}
                />

                <DeleteFilled
                  className={styles.deleteIcon}
                  onClick={() => handleDelete(user.id)}
                />
              </div>
            </div>
          </Col>
        ))}
      </Row>
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

export default UserManagementGrid;
