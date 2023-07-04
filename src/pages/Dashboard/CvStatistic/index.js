/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { getCookie } from "../../../helpers/cookie";
import { Card } from "antd";
import { useState, useEffect } from "react";
import { getCvStatistic } from "../../../services/CvServers";

export default function CvStatistic() {
  const [listCvStatistic, getListCvStatistic] = useState([]);

  const idCompany = getCookie("id");

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCvStatistic(idCompany);
      // console.log(response);
      getListCvStatistic(response);
    };
    fetchApi();
  }, []);
  return (
    <>
      <Card title={"CV"} style={{ minHeight: 300 }}>
        <p>
          Số Lượng CV : <strong>{listCvStatistic.length}</strong>
        </p>
        <p>
          CV Đã Đọc :{" "}
          <strong>
            {listCvStatistic.filter((item) => item.statusRead === true).length}
          </strong>
        </p>
        <p>
          CV Chưa Đọc :{" "}
          <strong>
            {listCvStatistic.filter((item) => item.statusRead !== true).length}
          </strong>
        </p>
      </Card>
    </>
  );
}
