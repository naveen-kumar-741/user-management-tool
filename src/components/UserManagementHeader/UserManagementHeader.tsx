import React, { useState } from "react";
import styles from "./UserManagementHeader.module.scss";
import Search from "antd/es/input/Search";
import { Button } from "antd";
import CreateOrUpdateUser from "../CreateOrUpdateUser/CreateOrUpdateUser";

const UserManagementHeader: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const onSearch = (searchKey: string) => {
    console.log("searchKey", searchKey);
  };

  const onClear = () => {};

  return (
    <header className={styles.sectionHeader}>
      <h1 className={styles.sectionTitle}>Users</h1>
      <Search
        placeholder="Search Here..."
        allowClear
        onSearch={onSearch}
        onClear={onClear}
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
