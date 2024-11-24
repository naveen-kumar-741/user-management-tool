import React, { useEffect } from "react";
import UserManagementHeader from "../../components/UserManagementHeader/UserManagementHeader";
import LayoutToggle from "../../components/LayoutToggle/LayoutToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPage, users } from "../../slices/usersSlice";
import UserManagementTable from "../../components/UserManagementTable/UserManagementTable";
import { Pagination } from "antd";
import { fetchUsers } from "../../slices/thunks";
import styles from "./UserManagementPage.module.scss";

const UserManagementPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { total_pages, page, limit } = useAppSelector(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, page, limit]);

  const onPagination = (value: number) => {
    dispatch(setPage(value));
  };

  return (
    <main className={styles.userManagementPage}>
      <section className={styles.userManagementSection}>
        <UserManagementHeader />
        <LayoutToggle />
        <UserManagementTable />
      </section>
      <Pagination
        defaultCurrent={1}
        onChange={onPagination}
        total={total_pages * 10}
        align="end"
      />
    </main>
  );
};

export default UserManagementPage;
