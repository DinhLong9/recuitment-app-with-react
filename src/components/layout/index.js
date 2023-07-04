import React from "react";
import RecuitmentHeader from "./Header";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import "./styles.scss";

const { Sider, Footer, Content } = Layout;

export default function LayoutDefault() {
  return (
    <>
      <Layout className="layout">
        <header className="layout__header">
          <RecuitmentHeader />
        </header>
        <div className="layout__main">
          <Layout hasSider style={{ minHeight: "100vh" }}>
            <Sider></Sider>
            <Content style={{ padding: 20 }}>
              <Outlet />
            </Content>
          </Layout>
        </div>
        <Footer className="layout__footer">
          <p>Copyright By</p>
        </Footer>
      </Layout>
    </>
  );
}
