import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { getCompany } from "../../../services/CompanyServices";
import { Link } from "react-router-dom";

export default function ListCompany() {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const responseCompany = await getCompany();

      setCompany(responseCompany);
    };
    fetchApi();
  }, []);
  // console.log(company);

  return (
    <>
      <div className="home__company">
        <Row align={"middle"}>
          <Col offset={1} span={23}>
            <h2>Danh Sách Một Số Công Ty</h2>
          </Col>
        </Row>
        <div className="company">
          <Row gutter={[0, 16]} align={"middle"} justify={"start"}>
            {company?.map((item, index) => (
              <Col offset={1} xl={6} lg={7} md={10} sm={12} key={index}>
                <Link to={`/company/${item.id}`}>
                  <Card hoverable={true} style={{ width: "100%" }}>
                    <h4 className="company__name">
                      Công Ty: {item.companyName}
                    </h4>
                    <p className="company__staff">
                      Nhân sự: {item.quantityPeople}
                    </p>
                    <p className="company__phone">
                      Số điện thoại: {item.phone}{" "}
                    </p>
                    <p className="company__email">Email: {item.email} </p>
                    <p className="company__address">Địa chỉ: {item.address}</p>
                  </Card>
                </Link>
              </Col>
            ))}
            <Col offset={1} span={23}>
              <Link to={"/company"}>
                <Button type="primary">Xem Thêm</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
