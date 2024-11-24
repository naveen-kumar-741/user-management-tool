import React from "react";
import { Radio, RadioChangeEvent } from "antd";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { LayoutToggleProps } from "../../interfaces/interfaces";
import { useAppDispatch } from "../../app/hooks";
import { setLimit, setPage } from "../../slices/usersSlice";
import styles from "./LayoutToggle.module.scss";

const LayoutToggle: React.FC<LayoutToggleProps> = ({ mode, setMode }) => {
  const dispatch = useAppDispatch();
  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
    if (e.target.value === "card") {
      dispatch(setLimit(6));
      dispatch(setPage(1));
    } else {
      dispatch(setPage(1));
      dispatch(setLimit(5));
    }
  };

  return (
    <Radio.Group onChange={handleModeChange} value={mode}>
      <Radio.Button value="table" className={styles.layoutToggle}>
        <TableOutlined />
        &nbsp;Table
      </Radio.Button>
      <Radio.Button value="card" className={styles.layoutToggle_1}>
        <UnorderedListOutlined />
        &nbsp;Card
      </Radio.Button>
    </Radio.Group>
  );
};

export default LayoutToggle;
