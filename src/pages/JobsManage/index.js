/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import JobsList from "./JobsList";
import { useDispatch } from "react-redux";
import { reload } from "../../actions/reloadAction";

export default function JobsManage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reload("/job-manage"));
  }, []);

  return (
    <>
      <h1>Danh Sách Việc Làm</h1>
      <Link to={"/create-job"}>
        <Button>
          <PlusCircleOutlined /> Tạo Công Việc Mới
        </Button>
      </Link>
      <JobsList />
    </>
  );
}
