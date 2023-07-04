import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import MenuSider from "./MenuSider";
import "./styles.scss";

const { Sider, Content } = Layout;

export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout__admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout>
          <Sider
            trigger={null}
            collapsed={collapsed}
            className="layout__admin--sider"
            breakpoint="lg"
            theme="light"
            width={230}
            onBreakpoint={(e) => setCollapsed(e)}
          >
            <MenuSider />
          </Sider>
          <Content className="layout__admin--main">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
