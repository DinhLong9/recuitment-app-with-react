/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getJobsDetail } from "../../services/JobsServices";

export default function CvJobName(props) {
  const { record } = props;

  const [jobName, setJobName] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getJobsDetail(record.idJob);
      setJobName(response);
    };
    fetchApi();
  }, []);
  return (
    <p>
      <strong>{jobName.name}</strong>{" "}
    </p>
  );
}
