/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Tag } from "antd";
import { getCompany } from "../../../services/CompanyServices";
import { Link } from "react-router-dom";

export default function DisplayJobs(props) {
  const { data = [] } = props;
  const [dataFinal, setDatafinal] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const company = await getCompany();
      const newData = data.map((item) => {
        const inforCompany = company.find(
          (itemCompany) => item.idCompany == itemCompany.id && itemCompany
        );
        return {
          inforCompany: inforCompany,
          ...item,
        };
      });
      setDatafinal(newData);
    };
    fetchApi();
  }, []);
  console.log(dataFinal);
  return (
    <>
      {dataFinal && (
        <Row gutter={[16, 16]} align={"middle"} justify={"center"}>
          {dataFinal.map((item, index) => (
            <Col xxl={8} xl={10} lg={12} md={13} sm={13} key={index}>
              <Card
                title={<Link to={`/job/${item.id}`}>{item.name}</Link>}
                hoverable={true}
                // style={{ minHeight: 300 }}
              >
                <p>
                  Ngôn Ngữ :{" "}
                  {item.tags.map((tag, indexTag) => (
                    <Tag color="cyan" key={indexTag}>
                      {tag}
                    </Tag>
                  ))}
                </p>
                <p>
                  Thành Phố:{" "}
                  {item.city.map((city, indexCity) => (
                    <Tag color="volcano" key={indexCity}>
                      {city}
                    </Tag>
                  ))}
                </p>
                <p>
                  Lương : <strong>{item.salary}$</strong>{" "}
                </p>
                <p>
                  Công Ty : <strong>{item.inforCompany.companyName}</strong>
                </p>
                <p>
                  Ngày Tạo : <strong>{item.createAt}</strong>
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}
