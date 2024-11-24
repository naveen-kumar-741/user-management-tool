import React, { useEffect, useState } from "react";
import UserManagementHeader from "../../components/UserManagementHeader/UserManagementHeader";
import LayoutToggle from "../../components/LayoutToggle/LayoutToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPage, users } from "../../slices/usersSlice";
import UserManagementTable from "../../components/UserManagementTable/UserManagementTable";
import { Pagination } from "antd";
import { fetchUsers, searchUser } from "../../slices/thunks";
import UserManagementGrid from "../../components/UserManagementGrid/UserManagementGrid";
import { TabPosition } from "../../interfaces/interfaces";
import styles from "./UserManagementPage.module.scss";

const UserManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
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

  return (
    <main className={styles.userManagementPage}>
      <section className={styles.userManagementSection}>
        <UserManagementHeader />
        <LayoutToggle setMode={setMode} mode={mode} />
        {mode === "table" && <UserManagementTable />}
      </section>

      {mode === "card" && <UserManagementGrid />}
      <Pagination
        defaultCurrent={1}
        current={page}
        onChange={onPagination}
        total={total_pages * 10}
        align="end"
      />
    </main>
  );
};

export default UserManagementPage;
