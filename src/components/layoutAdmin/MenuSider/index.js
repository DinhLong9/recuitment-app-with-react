import React from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  BarsOutlined,
  ControlOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function MenuSider() {
  const key = useSelector((state) => state.reloadReducer);
  // console.log(key);

  // const location = useLocation();
  // console.log(location);

  const item = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: <Link to={"/admin"}>Tổng Quan</Link>,
    },
    {
      key: "/infor-company",
      icon: <UserOutlined />,
      label: <Link to={"/infor-company"}>Thông Tin Công Ty</Link>,
    },
    {
      key: "/job-manage",
      icon: <BarsOutlined />,
      label: <Link to={"/job-manage"}>Quản Lý Việc Làm</Link>,
    },
    {
      key: "/cv-manage",
      icon: <ControlOutlined />,
      label: <Link to={"/cv-manage"}>Quản Lý CV</Link>,
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        selectedKeys={key}
        // defaultSelectedKeys={[location.pathname]}
        items={item}
      />
    </>
  );
}
