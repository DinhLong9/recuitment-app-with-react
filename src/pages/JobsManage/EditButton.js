import React from "react";
import {
  Button,
  Modal,
  Switch,
  Col,
  Row,
  Input,
  Form,
  Select,
  message,
  Tooltip,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getTags } from "../../services/TagsServices";
import { getCity } from "../../services/CityServices";
import getTimeCurrent from "../../helpers/getTime";
import { editJob } from "../../services/JobsServices";

const { TextArea } = Input;

export default function EditButton(props) {
  const { record, onReload } = props;
  const [mess, contextHolder] = message.useMessage();

  const [form] = Form.useForm();
  const rules = [
    {
      required: true,
    },
  ];

  const [tags, setTags] = useState([]);
  const [city, setcity] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getTags();
      const responseCity = await getCity();
      setTags(response);
      setcity(responseCity);
    };
    fetchApi();
  }, []);

  // console.log(record);
  const handleFinish = (value) => {
    // console.log(value);
    const options = {
      ...value,
      createAt: record.createAt,
      idCompany: record.idCompany,
      updateAt: getTimeCurrent(),
    };
    const response = editJob(record.id, options);
    if (response) {
      onReload();
      handleCancel();
      mess.success("Cập Nhật Thành Công");
    } else mess.error("Không Thể Cập Nhật. Vui Lòng Kiểm Tra Lại");
  };

  return (
    <>
      {contextHolder}
      <Tooltip title={"Chỉnh Sửa"}>
        <Button icon={<EditOutlined />} onClick={showModal}></Button>
        <Modal
          title="Chỉnh Sửa"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={false}
          width={"70%"}
        >
          <Form
            layout="vertical"
            form={form}
            onFinish={handleFinish}
            initialValues={record}
          >
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
                    Cập Nhật
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Tooltip>
    </>
  );
}
