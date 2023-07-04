import React from "react";
import { Button, Form, Input, Row, Col, Card, message } from "antd";
import { login } from "../../services/CompanyServices";
import { setCookie } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginReload } from "../../actions/loginAction";

export default function Login() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  const onFinish = async (value) => {
    // console.log(value);
    const checkExistAcc = await login(value.email, value.password);
    // console.log(checkExistAcc);
    if (checkExistAcc.length > 0) {
      const time = 1;
      setCookie("token", checkExistAcc[0].token, time);
      setCookie("id", checkExistAcc[0].id, time);
      setCookie("email", checkExistAcc[0].email, time);
      setCookie("companyName", checkExistAcc[0].companyName, time);
      dispatch(loginReload(true));
      navigate("/");
    } else {
      messageApi.open({
        type: "error",
        content: "Sai Tài Khoản Hoặc Mật Khẩu",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Row align={"middle"} justify={"center"}>
        <Col xxl={6} xl={8} lg={9} md={10} sm={12}>
          <Card title={"Đăng Nhập"}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng Nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
