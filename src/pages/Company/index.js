import React from "react";
import { Row, Col, Card } from "antd";
import { useState, useEffect } from "react";
import { getCompany } from "../../services/CompanyServices";
import { Link } from "react-router-dom";

export default function Company() {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const responseCompany = await getCompany();

      setCompany(responseCompany);
    };
    fetchApi();
  }, []);
  console.log(company);
  return (
    <>
      <Row align={"middle"} gutter={[16, 16]} justify={"center"}>
        <Col offset={1} span={23}>
          <h2>Danh Sách Các Công Ty</h2>
        </Col>
        {company.map((item, index) => (
          <Col xxl={8} xl={8} lg={8} md={10} sm={12} key={index}>
            <Link to={`/company/${item.id}`}>
              <Card hoverable={true} style={{ width: "100%" }}>
                <h4 className="company__name">Công Ty: {item.companyName}</h4>
                <p className="company__staff">Nhân sự: {item.quantityPeople}</p>
                <p className="company__phone">Số điện thoại: {item.phone} </p>
                <p className="company__email">Email: {item.email} </p>
                <p className="company__address">Địa chỉ: {item.address}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
