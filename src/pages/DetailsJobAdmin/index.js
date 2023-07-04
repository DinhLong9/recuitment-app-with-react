/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsDetail } from "../../services/JobsServices";
import GoBack from "../JobDetails/Goback";
import { Row, Col, Tag } from "antd";

export default function DetailsJobAdmin() {
  const param = useParams();
  const [dataJob, setDataJob] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJobsDetail(param.id);
      setDataJob(response);
    };
    fetchApi();
  }, []);

  console.log(dataJob);
  return (
    <>
      {dataJob && (
        <Row>
          <Col offset={1} span={22}>
            <GoBack />
            <h1>{dataJob.name}</h1>
            <p>
              Tags :{" "}
              {dataJob.tags?.map((itemTags, indexTags) => (
                <Tag color="volcano" key={indexTags}>
                  {itemTags}{" "}
                </Tag>
              ))}{" "}
            </p>
            <p>
              Thành Phố :{" "}
              {dataJob.city?.map((itemCity, indexCity) => (
                <Tag color="cyan" key={indexCity}>
                  {itemCity}{" "}
                </Tag>
              ))}{" "}
            </p>
            <p>
              Mức Lương : <strong>{dataJob.salary}$</strong>{" "}
            </p>
            <p>
              Trạng Thái :{" "}
              {dataJob.status ? (
                <Tag color="green">Đang Bật</Tag>
              ) : (
                <Tag color="red">Đang Tắt</Tag>
              )}
            </p>
            <p>
              Ngày Tạo : <strong>{dataJob.createAt}</strong>
            </p>
            <p>
              Cập Nhật : <strong>{dataJob.updateAt}</strong>
            </p>
            <p>
              Mô Tả Công Việc : <span>{dataJob.description}</span>{" "}
            </p>
          </Col>
        </Row>
      )}
    </>
  );
}
