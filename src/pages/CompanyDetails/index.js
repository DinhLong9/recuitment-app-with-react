/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag } from "antd";
import GoBack from "../JobDetails/Goback";
import { useParams } from "react-router-dom";
import { getCompanyDetails } from "../../services/CompanyServices";
import { getListJobs } from "../../services/JobsServices";
import { Link } from "react-router-dom";

export default function CompanyDetails() {
  const param = useParams();
  const [companyDetails, setCompanyDetails] = useState([]);
  const [listJobs, setListJobs] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompanyDetails(param.id);
      const responseJobs = await getListJobs(param.id);
      setCompanyDetails(response);
      setListJobs(responseJobs);
    };
    fetchApi();
  }, []);

  // console.log(companyDetails);
  // console.log(listJobs);

  return (
    <>
      <div className="mb-24">
        {companyDetails && (
          <>
            <Row align={"middle"} gutter={[16, 16]} justify={"center"}>
              <Col offset={1} span={22}>
                <GoBack />
                <h2>{companyDetails.companyName}</h2>
                <p>
                  Địa Chỉ : <strong>{companyDetails.address}</strong>
                </p>
                <p>
                  Số Lượng Nhân Sự :{" "}
                  <strong>{companyDetails.quantityPeople}</strong>
                </p>
                <p>
                  Thời Gian Làm Việc :{" "}
                  <strong>{companyDetails.workingTime}</strong>
                </p>
                <p>
                  Link Website : <strong>{companyDetails.website}</strong>
                </p>
                <div>
                  Mô Tả Ngắn :{" "}
                  <div className="mt-10">{companyDetails.description}</div>
                </div>
                <div>
                  Mô Chi Tiết :{" "}
                  <div className="mt-10">{companyDetails.detail}</div>
                </div>
                <h3>Danh Sách Các Jobs :</h3>
              </Col>
            </Row>
            <Row align={"middle"} justify={"center"} gutter={[16, 16]}>
              {listJobs?.map((item, index) => (
                <Col
                  xxl={7}
                  xl={9}
                  lg={12}
                  md={13}
                  sm={13}
                  key={index}
                  // style={{ margin: [0, 20] }}
                >
                  <Card
                    title={<Link to={`/job/${item.id}`}>{item.name}</Link>}
                    hoverable={true}
                    style={{ width: "100%" }}
                  >
                    <p>
                      Ngôn Ngữ :{" "}
                      {item.tags?.map((tag, indexTag) => (
                        <Tag color="cyan" key={indexTag}>
                          {tag}
                        </Tag>
                      ))}
                    </p>
                    <p>
                      Thành Phố:{" "}
                      {item.city?.map((city, indexCity) => (
                        <Tag color="volcano" key={indexCity}>
                          {city}
                        </Tag>
                      ))}
                    </p>
                    <p>
                      Lương : <strong>{item.salary}$</strong>{" "}
                    </p>
                    <p>
                      Công Ty : <strong></strong>
                    </p>
                    <p>
                      Ngày Tạo : <strong>{item.createAt}</strong>
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </div>
    </>
  );
}
