/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getCvStatistic } from "../../services/CvServers";
import { Table, Tag, Tooltip, Button } from "antd";
import CvJobName from "./CvJobName";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";
import DeleteButtonCv from "./DeleteButtonCv";
import { useDispatch } from "react-redux";
import { reload } from "../../actions/reloadAction";

export default function CvManage() {
  const idCompany = getCookie("id");

  const [dataCv, setDataCv] = useState([]);

  const fetchApi = async () => {
    const responseCv = await getCvStatistic(idCompany);

    setDataCv(responseCv.reverse());
  };

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApi();
    dispatch(reload("/cv-manage"));
  }, []);
  // console.log(dataCv);

  const handleReload = () => {
    fetchApi();
  };

  const columns = [
    {
      title: "Tên Công Việc",
      dataIndex: "idJob",
      key: "idJob",
      render: (_, record) => <CvJobName record={record} />,
    },
    {
      title: "Họ Tên",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Ngày Gửi",
      key: "createAt",
      dataIndex: "createAt",
    },
    {
      title: "Trạng Thái",
      key: "status",
      render: (_, record) => {
        // console.log(record);
        if (record.statusRead) {
          return <Tag color="green">Đã Đọc</Tag>;
        } else {
          return <Tag color="red">Chưa Đọc</Tag>;
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
            <Link to={`/details-cv/${record.id}`}>
              <Tooltip title={"Xem Chi Tiết"}>
                <Button icon={<EyeOutlined />}></Button>
              </Tooltip>
            </Link>
            <DeleteButtonCv record={record} onReload={handleReload} />
          </>
        );
      },
    },
  ];

  return (
    <>
      <h1>Danh Sách CV</h1>
      <Table dataSource={dataCv} columns={columns} rowKey={"id"} />;
    </>
  );
}
