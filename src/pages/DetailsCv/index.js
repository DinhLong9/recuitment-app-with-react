/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsDetail } from "../../services/JobsServices";
import GoBack from "../JobDetails/Goback";
import { Row, Col, Tag, Card } from "antd";
import { editCv, getCvDetails } from "../../services/CvServers";

export default function DetailsCv() {
  const param = useParams();
  const [dataCv, setDataCv] = useState([]);
  const [dataJob, setDataJob] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const responseCv = await getCvDetails(param.id);
      const responseJob = await getJobsDetail(responseCv[0].idJob);
      setDataCv(responseCv);
      setDataJob(responseJob);

      const option = {
        ...responseCv[0],
        statusRead: true,
      };

      const updateStatusRead = await editCv(responseCv[0]?.id, option);
    };
    fetchApi();
  }, []);

  return (
    <>
      <GoBack />
      {dataCv && (
        <Card title={`Ứng Viên: ${dataCv[0]?.name}`} className="mt-10">
          <Row>
            <Col offset={1} span={22}>
              <p>
                Ngày Gửi : <strong> {dataCv[0]?.createAt}</strong>
              </p>
              <p>
                Số Điện Thoại : <strong> {dataCv[0]?.phone}</strong>
              </p>
              <p>
                Email : <strong>{dataCv[0]?.email}$</strong>{" "}
              </p>
              <p>
                Thành Phố Ứng Tuyển : <strong>{dataCv[0]?.city}</strong>
              </p>
              <p>
                Giới Thiệu Bản Thân : <strong>{dataCv[0]?.description}</strong>
              </p>
              <p>
                Link Project : <strong>{dataCv[0]?.linkProject}</strong>
              </p>
            </Col>
          </Row>
        </Card>
      )}
      {dataJob && (
        <Card title={`Thông Tin Công Việc: ${dataJob.name}`} className="mt-10">
          <Row>
            <Col offset={1} span={22}>
              <p>
                Tags :{" "}
                {dataJob.tags?.map((itemTags, indexTags) => (
                  <Tag color="volcano" key={indexTags}>
                    {itemTags}{" "}
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
                Mô Tả : <span>{dataJob.description}</span>{" "}
              </p>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
}
