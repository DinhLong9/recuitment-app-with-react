/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getCompanyDetails } from "../../services/CompanyServices";
import {
  Card,
  Form,
  Input,
  Row,
  Col,
  Button,
  message,
  InputNumber,
} from "antd";
import { editCompany } from "../../services/EditCompanyServices";
import { useDispatch } from "react-redux";
import { reload } from "../../actions/reloadAction";

const { TextArea } = Input;

export default function InforCompany() {
  const idCompany = getCookie("id");
  const [infor, setInfor] = useState();
  const [edit, setEdit] = useState(false);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  const dispatch = useDispatch();

  const rules = [
    {
      required: true,
      message: "Bắt Buộc",
    },
  ];

  const fetchApi = async () => {
    const response = await getCompanyDetails(idCompany);
    if (response) {
      setInfor(response);
    }
  };

  useEffect(() => {
    fetchApi();
    dispatch(reload("/infor-company"));
  }, []);

  // console.log(infor);

  const handleFinish = async (value) => {
    const response = await editCompany(idCompany, value);

    console.log(response);
    if (response) {
      mess.success("Cập Nhật Thành Công");
      fetchApi();
      setEdit(false);
    }
  };

  const handleCancel = () => {
    setEdit(false);
    form.resetFields();
  };

  const handleFix = () => {
    setEdit(true);
  };

  return (
    <>
      {contextHolder}
      {infor && (
        <Card
          title={"Thông Tin Công Ty"}
          extra={
            edit ? (
              <Button onClick={handleCancel}>Hủy</Button>
            ) : (
              <Button onClick={handleFix} type="primary">
                Chỉnh Sửa
              </Button>
            )
          }
        >
          <Form
            layout="vertical"
            form={form}
            initialValues={infor}
            onFinish={handleFinish}
            disabled={!edit}
          >
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item
                  label="Tên Công Ty"
                  name={"companyName"}
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name={"email"} rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số Điện Thoại" name={"phone"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Địa Chỉ" name={"address"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số Lượng Nhân Sự" name={"quantityPeople"}>
                  <InputNumber />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Thời Gian Làm Việc" name={"workingTime"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Link Website" name={"website"}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                {" "}
                <Form.Item label="Mô Tả Ngắn" name={"description"}>
                  <TextArea rows={4} />
                </Form.Item>
              </Col>
              <Col span={24}>
                {" "}
                <Form.Item label="Mô Tả Chi Tiết" name={"detail"}>
                  <TextArea rows={10} />
                </Form.Item>
              </Col>
              <Col span={24}>
                {edit && (
                  <>
                    <Button type="primary" htmlType="submit">
                      Cập Nhật
                    </Button>
                    <Button className="ml-24" onClick={handleCancel}>
                      Hủy
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}
