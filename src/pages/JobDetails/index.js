/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsDetail } from "../../services/JobsServices";
import {
  Button,
  Row,
  Col,
  Tag,
  Card,
  Form,
  Input,
  Select,
  notification,
} from "antd";
import { getCompanyDetails } from "../../services/CompanyServices";
import getTimeCurrent from "../../helpers/getTime";
import { postCv } from "../../services/CvServers";
import GoBack from "./Goback";

const { TextArea } = Input;
const { Option } = Select;

export default function JobDetails() {
  const param = useParams();
  const [job, setJob] = useState([]);
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();
  const rules = [
    {
      required: true,
      message: "Bạn Thiếu Thông Tin Ở Đây",
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJobsDetail(param.id);
      const inforCompany = await getCompanyDetails(response.idCompany);
      const result = {
        ...response,
        inforCompany: inforCompany,
      };

      setJob(result);
    };
    fetchApi();
  }, []);

  const onFinish = async (value) => {
    console.log(value);
    value.idJob = parseInt(param.id);
    value.idCompany = job.idCompany;
    value.creatAt = getTimeCurrent();
    const response = await postCv(value);
    console.log(response);
    if (response) {
      form.resetFields();
      noti.success({
        message: "Thành Công",
        description: "Hồ Sơ Của Bạn Đã Được Gửi Đến Nhà Tuyển Dụng",
      });
    } else {
      noti.error({
        message: "Thất Bại",
        description: "Vui Lòng Thử Lại",
      });
    }
  };

  console.log(job);
  return (
    <>
      {contextHolder}

      {job && (
        <Row>
          <Col offset={1} span={22}>
            <GoBack />
            <h1>{job.name}</h1>
            <Button type="primary" href="#formApply">
              Ứng Tuyển Ngay
            </Button>
            <p>
              Tags :{" "}
              {job.tags?.map((itemTags, indexTags) => (
                <Tag color="volcano" key={indexTags}>
                  {itemTags}{" "}
                </Tag>
              ))}{" "}
            </p>
            <p>
              Thành Phố :{" "}
              {job.city?.map((itemCity, indexCity) => (
                <Tag color="cyan" key={indexCity}>
                  {itemCity}{" "}
                </Tag>
              ))}{" "}
            </p>
            <p>
              Mức Lương : <strong>{job.salary}$</strong>{" "}
            </p>
            <p>
              Địa Chỉ Công Ty : <strong>{job.inforCompany?.address}</strong>
            </p>
            <p>
              Thời Gian Đăng Bài : <strong>{job.createAt}</strong>
            </p>
            <p>
              Mô Tả Công Việc : <span>{job.description}</span>{" "}
            </p>
          </Col>
        </Row>
      )}
      <Card title={"Ứng Tuyển Ngay"} id="formApply">
        <Form
          name="form-apply"
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <Row align={"middle"} justify={"center"}>
            <Col xl={5} lg={5} md={5} sm={10} offset={1}>
              <Form.Item rules={rules} name={"name"} label="Họ Tên">
                <Input />
              </Form.Item>
            </Col>
            <Col xl={5} lg={5} md={5} sm={10} offset={1}>
              <Form.Item rules={rules} name={"phone"} label="Số Điện Thoại">
                <Input />
              </Form.Item>
            </Col>
            <Col xl={5} lg={5} md={5} sm={10} offset={1}>
              <Form.Item rules={rules} name={"email"} label="Email">
                <Input />
              </Form.Item>
            </Col>
            <Col xl={5} lg={5} md={5} sm={10} offset={1}>
              <Form.Item rules={rules} name={"city"} label="Thành Phố">
                <Select>
                  {job.city?.map((item, index) => (
                    <Option value={`${item}`} key={index}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={23} offset={1}>
              <Form.Item
                name={"description"}
                label="Giới Thiệu Bản Thân"
                rules={rules}
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
            <Col span={23} offset={1}>
              <Form.Item
                name={"linkProject"}
                label="Danh Sách Link Project Đã Làm"
                rules={rules}
              >
                <TextArea rows={6} />
              </Form.Item>
            </Col>
            <Col span={23} offset={1}>
              <Button type="primary" htmlType="submit">
                Gửi Yêu Cầu
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
