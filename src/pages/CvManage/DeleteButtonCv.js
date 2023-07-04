import React from "react";
import { Button, Popconfirm, message, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteCV } from "../../services/CvServers";

export default function DeleteButtonCv(props) {
  const { record, onReload } = props;
  const [mess, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    const response = await deleteCV(record.id);
    if (response) {
      mess.success("Xóa Thành Công ");
      onReload();
    } else {
      mess.error("Xóa Không Thành Công ");
    }
  };

  return (
    <>
      {contextHolder}
      <Tooltip title={"Xóa"}>
        <Popconfirm title="Sure to Delete?" onConfirm={handleDelete}>
          <Button danger icon={<DeleteOutlined />}></Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
}
