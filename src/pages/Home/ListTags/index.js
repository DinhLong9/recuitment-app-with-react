import React, { useEffect, useState } from "react";
import { Button, Row, Col } from "antd";
import { getTags } from "../../../services/TagsServices";
import { Link } from "react-router-dom";

export default function ListTag() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const responseTag = await getTags();

      setTags(responseTag);
    };
    fetchApi();
  }, []);
  // console.log(tags);

  return (
    <>
      {tags.length > 0 && (
        <div className="home__tags">
          <Row align={"middle"} justify={"start"} gutter={[0, 10]}>
            {tags?.map((item) => (
              <Col xl={3} lg={3} md={5} sm={5} offset={1} key={item.key}>
                <Button
                  size={"small"}
                  type="default"
                  style={{
                    color: "#000",
                    background: "#FEC256",
                    maxWidth: 100,
                  }}
                  block
                  ghost
                >
                  <Link to={`/search?keyword=${item.value}`}>
                    {" "}
                    {item.value}
                  </Link>
                </Button>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </>
  );
}
