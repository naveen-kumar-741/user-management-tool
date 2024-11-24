import React, { useState } from "react";
import Search from "antd/es/input/Search";
import { Button } from "antd";
import CreateOrUpdateUser from "../CreateOrUpdateUser/CreateOrUpdateUser";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../app/hooks";
import { setPage, setSearchKey } from "../../slices/usersSlice";
import styles from "./UserManagementHeader.module.scss";

const UserManagementHeader: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onSearch = debounce((searchKey: string) => {
    dispatch(setSearchKey(searchKey.trim()));
    dispatch(setPage(1));
  }, 300);

  return (
    <header className={styles.sectionHeader}>
      <h1 className={styles.sectionTitle}>Users</h1>
      <Search
        placeholder="Search Here..."
        allowClear
        onSearch={onSearch}
        onChange={(e) => onSearch(e.target.value)}
        className={styles.searchInput}
      />
      <Button
        type="primary"
        className={styles.createBtn}
        onClick={() => setShow(true)}
      >
        Create User
      </Button>
      <Button
        type="primary"
        className={styles.createBtnMob}
        onClick={() => setShow(true)}
      >
        +
      </Button>
      <CreateOrUpdateUser show={show} setShow={setShow} />
    </header>
  );
};

export default UserManagementHeader;
