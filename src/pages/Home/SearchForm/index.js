import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Row, Col } from "antd";
import { getCity } from "../../../services/CityServices";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const responseCity = await getCity();

      setCity([
        {
          key: 0,
          value: "All",
        },
        ...responseCity,
      ]);
    };
    fetchApi();
  }, []);

  // Tìm Kiếm và Chuyển Hướng  ( dùng redux, useNavigate)
  const handleSubmit = async (e) => {
    // console.log(e);
    let searchCity = e.city || "";
    searchCity = e.city === "All" ? "" : searchCity;
    navigate(`/search?city=${searchCity}&keyword=${e.keyword || ""}`);
  };

  return (
    <>
      <h1 className="home__title">1000+ IT Jobs For Developers</h1>
      <div className="home__form">
        <Row align={"middle"} justify={"center"}>
          <Col span={24}>
            <Form
              name="control-hooks"
              onFinish={handleSubmit}
              layout={"inline"}
              style={{
                justifyContent: "center",
              }}
            >
              <Form.Item name="keyword">
                <Input placeholder="Nhập Từ Khóa ..." />
              </Form.Item>
              <Form.Item name="city">
                <Select
                  placeholder="Chọn Thành Phố"
                  // onChange={onGenderChange}
                  allowClear
                  options={city}
                  // value={city}
                ></Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tìm Kiếm
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
