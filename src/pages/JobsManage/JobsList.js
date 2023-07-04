/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getListJobs } from "../../services/JobsServices";
import { Tag, Table, Button, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { Link } from "react-router-dom";

export default function JobsList() {
  const idCompany = getCookie("id");
  const [dataJobs, setDataJobs] = useState([]);

  const fetchApi = async () => {
    const response = await getListJobs(idCompany);
    // console.log(response);
    setDataJobs(response);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleReload = () => {
    fetchApi();
  };

  const columns = [
    {
      title: "Tên Công Việc",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color="volcano" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Mức Lương $",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời Gian",
      key: "time",
      render: (text) => {
        // console.log(text);
        return (
          <>
            <p>Ngày Tạo : {text.createAt} </p>
            <p>Ngày Cập Nhật : {text.updateAt} </p>
          </>
        );
      },
    },
    {
      title: "Trạng Thái",
      key: "status",
      render: (text) => {
        // console.log(text);
        if (text.status) {
          return <Tag color="green">Đang Bật</Tag>;
        } else {
          return <Tag color="red">Đang Tắt</Tag>;
        }
      },
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => {
        // console.log(record);
        return (
          <>
            <Link to={`/details-job/${record.id}`}>
              <Tooltip title={"Xem Chi Tiết"}>
                <Button icon={<EyeOutlined />}></Button>
              </Tooltip>
            </Link>
            <EditButton record={record} onReload={handleReload} />
            <DeleteButton record={record} onReload={handleReload} />
          </>
        );
      },
    },
  ];

  return (
    <Table
      className="mt-10"
      columns={columns}
      dataSource={dataJobs.reverse()}
      rowKey={"id"}
    />
  );
}
