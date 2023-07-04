import React from "react";
import { Button, Form, Input, Row, Col, Card, notification } from "antd";
import { createCompany, getCompany } from "../../services/CompanyServices";
import { generateToken } from "../../helpers/generateToken";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [noti, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const onFinish = async (value) => {
    const responseCompany = await getCompany();

    // console.log(value);
    let options = {
      companyName: value.companyName,
      email: value.email,
      password: value.password,
      phone: value.phone,
      token: generateToken(),
    };

    const checkExist = responseCompany.filter(
      (item) => item.email === options.email && item.phone === options.phone
    );
    // console.log(checkExist);

    if (checkExist.length > 0) {
      noti.error({
        message: "Đăng Ký Thất Bại",
        description:
          "Email Hoặc Số Điện Thoại Đã Tồn Tại. Vui Lòng Kiểm Tra Lại",
      });
    } else {
      const newCompany = await createCompany(options);
      if (newCompany) {
        navigate("/login");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Row align={"middle"} justify={"center"}>
        <Col xxl={6} xl={6} lg={7} md={8} sm={10}>
          <Card title={"Đăng Ký"}>
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
                label="Tên Công Ty"
                name="companyName"
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
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Số Điện Thoại" name="phone">
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
                  Đăng Ký
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
