/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./styles.scss";
import { getCookie } from "../../../helpers/cookie";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function RecuitmentHeader() {
  const token = getCookie("token");
  const reload = useSelector((state) => state.loginReducer);

  return (
    <>
      <div className="header">
        <div className="header__user">
          <h1>
            <Link to={"/"}>IT JOBS</Link>
          </h1>
        </div>
        <div className="header__btn">
          {token ? (
            <>
              <div className="header__btn--manage">
                <Button>
                  <Link to={"/admin"}>
                    <UserOutlined />
                    <span> Quản Lý</span>
                  </Link>
                </Button>
              </div>
              <div className="header__btn--logout">
                <Button type="primary">
                  <Link to={"/logout"}>
                    {" "}
                    <LogoutOutlined />
                    <span> Đăng Xuất</span>
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="header__btn--login">
                <Button>
                  <Link to={"/login"}>Đăng Nhập</Link>
                </Button>
              </div>
              <div className="header__btn--register">
                <Button type="primary">
                  <Link to={"/register"}>Đăng Ký</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
