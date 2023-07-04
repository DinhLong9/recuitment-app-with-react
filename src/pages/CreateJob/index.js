import React, { useEffect, useState } from "react";
import GoBack from "../JobDetails/Goback";
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Select,
  Switch,
  Button,
  message,
} from "antd";
import { getTags } from "../../services/TagsServices";
import { getCity } from "../../services/CityServices";
import { getCookie } from "../../helpers/cookie";
import { createNewJob } from "../../services/JobsServices";
import getTimeCurrent from "../../helpers/getTime";

const { TextArea } = Input;

export default function CreateJob() {
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setcity] = useState([]);
  const [mess, contextHolder] = message.useMessage();

  const rules = [
    {
      required: true,
    },
  ];

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTags();
      const responseCity = await getCity();
      setTags(response);
      setcity(responseCity);
    };
    fetchApi();
  }, []);

  // console.log(tags);
  // console.log(city);

  const handleFinish = async (value) => {
    // console.log(value);
    const options = {
      idCompany: parseInt(getCookie("id")),
      createAt: getTimeCurrent(),
      ...value,
    };
    // console.log(options);
    const response = await createNewJob(options);
    if (response) {
      mess.success("Tạo Công Việc Mới Thành Công");
      form.resetFields();
    } else {
      mess.error("Tạo Công Việc Mới Không Thành Công");
    }
  };

  return (
    <>
      {contextHolder}
      <GoBack />
      <Card className="mt-10" title={"Công Việc Mới"}>
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Row align={"middle"} gutter={[20]}>
            <Col span={24}>
              <Form.Item label="Tên Job" name={"name"} rules={rules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Tags" name={"tags"} rules={rules}>
                <Select options={tags} mode="tags"></Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mức Lương" name={"salary"} rules={rules}>
                <Input addonAfter={"$"} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thành Phố" name={"city"} rules={rules}>
                <Select options={city} mode="tags"></Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô Tả" name={"description"} rules={rules}>
                <TextArea rows={16} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Trạng Thái"
                valuePropName="checked"
                name={"status"}
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
