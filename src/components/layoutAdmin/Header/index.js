import React from "react";
import { Button, Row, Col } from "antd";
import {
  LogoutOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Header(prop) {
  const collapsed = prop.collapsed;
  const setCollapsed = prop.setCollapsed;

  return (
    <>
      <header className="LayoutHeader">
        <Row align={"middle"} justify={"space-between"}>
          <Col xxl={7} xl={7} lg={8} md={9} sm={12}>
            <div
              className={`LayoutHeader__admin ${
                collapsed && "LayoutHeader__admin--collsapsed"
              }`}
            >
              <Link to={"/admin"}>
                <h1>{collapsed ? "ITA" : "IT ADMIN"}</h1>
              </Link>
            </div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Col>

          <Col xxl={5} xl={6} lg={7} md={9} sm={12}>
            <div className="LayoutHeader__home">
              <Link to={"/admin"}>
                <Button className="LayoutHeader__home--btn">
                  <HomeOutlined />
                  Trang Chủ
                </Button>
              </Link>
              <Link to={"/logout"}>
                <Button className="btn">
                  {" "}
                  <LogoutOutlined />
                  Đăng Xuất
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </header>
    </>
  );
}
