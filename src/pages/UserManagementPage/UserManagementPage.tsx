import React, { useEffect, useState } from "react";
import UserManagementHeader from "../../components/UserManagementHeader/UserManagementHeader";
import LayoutToggle from "../../components/LayoutToggle/LayoutToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPage, users } from "../../slices/usersSlice";
import UserManagementTable from "../../components/UserManagementTable/UserManagementTable";
import { Button, Pagination } from "antd";
import { fetchUsers, searchUser } from "../../slices/thunks";
import UserManagementGrid from "../../components/UserManagementGrid/UserManagementGrid";
import { TabPosition } from "../../interfaces/interfaces";
import { PoweroffOutlined } from "@ant-design/icons";
import { logoutUser } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import styles from "./UserManagementPage.module.scss";

const UserManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { total_pages, page, limit, searchKey } = useAppSelector(users);
  const [mode, setMode] = useState<TabPosition>("table");

  useEffect(() => {
    if (searchKey.length > 0) {
      dispatch(searchUser());
    } else {
      dispatch(fetchUsers());
    }
  }, [dispatch, page, limit, searchKey]);

  const onPagination = (value: number) => {
    dispatch(setPage(value));
  };

  const handleLogOut = async () => {
    const status = await dispatch(logoutUser());
    if (status.type === "auth/logoutUser/fulfilled") {
      navigate("/sign-in");
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.userManagementPageHeader}>
        Elon Musk
        <Button
          style={{ margin: "0 15px" }}
          type="primary"
          title="Logout"
          danger
          icon={<PoweroffOutlined />}
          onClick={() => handleLogOut()}
        />
      </header>
      <section className={styles.userManagementPage}>
        <div className={styles.userManagementSection}>
          <UserManagementHeader />
          <LayoutToggle setMode={setMode} mode={mode} />
          {mode === "table" && <UserManagementTable />}
        </div>

        {mode === "card" && <UserManagementGrid />}
        <Pagination
          defaultCurrent={1}
          current={page}
          onChange={onPagination}
          total={total_pages * 10}
          align="end"
        />
      </section>
    </main>
  );
};

export default UserManagementPage;
