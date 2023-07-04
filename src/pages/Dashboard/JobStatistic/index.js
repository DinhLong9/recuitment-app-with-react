/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getListJobs } from "../../../services/JobsServices";
import { Card } from "antd";

export default function JobStatistic() {
  const idCompany = getCookie("id");

  const [listJobsStatistic, getListJobsStatistic] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJobs(idCompany);
      // console.log(response);
      getListJobsStatistic(response);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card title={"Job"} style={{ minHeight: 300 }}>
        <p>
          Số Lượng Job : <strong>{listJobsStatistic.length}</strong>
        </p>
        <p>
          Job Đang Bật :{" "}
          <strong>
            {listJobsStatistic.filter((item) => item.status === true).length}
          </strong>
        </p>
        <p>
          Job Đang Tắt :{" "}
          <strong>
            {listJobsStatistic.filter((item) => item.status !== true).length}
          </strong>
        </p>
      </Card>
    </>
  );
}
