import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function GoBack() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Button onClick={handleBack} style={{ marginTop: 16 }}>
        Trở Lại
      </Button>
    </>
  );
}
