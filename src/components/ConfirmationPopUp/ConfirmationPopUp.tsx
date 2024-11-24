import React from "react";
import { Button, Modal } from "antd";
import { ConfirmationPopUpProps } from "../../interfaces/interfaces";

const ConfirmationPopUp: React.FC<ConfirmationPopUpProps> = ({
  show,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      centered={true}
      open={show}
      title={"Are you sure to delete this user?"}
      onOk={onConfirm}
      onCancel={onClose}
      width={"400px"}
      footer={[
        <Button key="back" onClick={onClose}>
          No
        </Button>,
        <Button key="submit" type="primary" danger onClick={onConfirm}>
          Yes
        </Button>,
      ]}
    ></Modal>
  );
};

export default ConfirmationPopUp;
