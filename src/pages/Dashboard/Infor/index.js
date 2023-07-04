/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getCookie } from "../../../helpers/cookie";
import { getCompanyDetails } from "../../../services/CompanyServices";
import { Card } from "antd";

export default function Infor() {
  const idCompany = getCookie("id");

  const [inforCompany, setInforCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCompanyDetails(idCompany);
      // console.log(response);
      setInforCompany(response);
    };
    fetchApi();
  }, []);

  return (
    <>
      <Card title={"Thông Tin Công Ty"} style={{ minHeight: 300 }}>
        <p>
          Tên Công Ty : <strong>{inforCompany.companyName}</strong>
        </p>
        <p>
          Email : <strong>{inforCompany.email}</strong>
        </p>
        <p>
          Số Điện Thoại : <strong>{inforCompany.phone}</strong>
        </p>
        <p>
          Số Nhân Viên : <strong>{inforCompany.quantityPeople}</strong>
        </p>
      </Card>
    </>
  );
}
