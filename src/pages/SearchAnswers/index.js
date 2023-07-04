import React, { useState } from "react";
import { Col, Row, Tag } from "antd";
import { useSearchParams } from "react-router-dom";
import { getJobs } from "../../services/JobsServices";
import DisplayJobs from "./DisplayJobs";

export default function SearchAnswers() {
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParam] = useSearchParams();
  // console.log(searchParams.get("city"));
  const citySearch = searchParams.get("city") || "";
  const keywordSearch = searchParams.get("keyword") || "";
  const [data, setData] = useState([]);

  useState(() => {
    const fetchApi = async () => {
      const response = await getJobs();
      if (response) {
        const finalJobs = response.filter((item) => {
          const city = citySearch ? item.city?.includes(citySearch) : true;
          const keyword = keywordSearch
            ? item.tags?.includes(keywordSearch)
            : true;
          const status = item.status;
          return city && keyword && status;
        });
        setData(finalJobs);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <Row align={"middle"} justify={"center"}>
        <Col span={4} xl={4} lg={5} md={6} sm={8}>
          <h2>Kết Quả Tìm Kiếm:</h2>
        </Col>
        <Col span={4} xl={4} lg={5} md={6} sm={8}>
          {keywordSearch && <Tag color="red">{keywordSearch}</Tag>}
          {citySearch && <Tag color="magenta">{citySearch} </Tag>}
        </Col>
      </Row>
      {data.length > 0 ? (
        <DisplayJobs data={data} />
      ) : (
        <div>Không tìm thấy công việc nào</div>
      )}
    </>
  );
}
