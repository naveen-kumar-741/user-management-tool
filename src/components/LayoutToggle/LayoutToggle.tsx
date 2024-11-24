import React, { useState } from "react";
import { Radio, RadioChangeEvent } from "antd";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import styles from "./LayoutToggle.module.scss";

type TabPosition = "table" | "card";

const LayoutToggle: React.FC = () => {
  const [mode, setMode] = useState<TabPosition>("table");

  const handleModeChange = (e: RadioChangeEvent) => {
    setMode(e.target.value);
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
