/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Row, Col } from "antd";
import JobStatistic from "./JobStatistic";
import CvStatistic from "./CvStatistic";
import Infor from "./Infor";
import { useDispatch } from "react-redux";
import { reload } from "../../actions/reloadAction";

export default function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reload("/admin"));
  }, []);

  return (
    <>
      <h1>Tổng Quan</h1>
      <Row gutter={[20, 20]} align={"middle"} justify={"space-evenly"}>
        <Col xxl={8} xl={8} lg={8} md={9} sm={10}>
          {" "}
          <JobStatistic />
        </Col>
        <Col xxl={8} xl={8} lg={8} md={9} sm={10}>
          {" "}
          <CvStatistic />
        </Col>
        <Col xxl={8} xl={8} lg={8} md={9} sm={10}>
          {" "}
          <Infor />
        </Col>
      </Row>
    </>
  );
}
