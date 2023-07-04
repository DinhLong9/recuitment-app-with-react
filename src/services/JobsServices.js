import { get } from "../utils/request";
import { post } from "../utils/request";
import { del } from "../utils/request";
import { edit } from "../utils/request";

export const getJobs = async () => {
  const result = await get(`jobs`);
  return result;
};

export const getJobsDetail = async (id) => {
  const result = await get(`jobs/${id}`);
  return result;
};

export const getListJobs = async (id) => {
  const result = await get(`jobs?idCompany=${id}`);
  return result;
};

export const createNewJob = async (options) => {
  const result = await post(`jobs`, options);
  return result;
};

export const deleteJob = async (id) => {
  const result = await del(`jobs`, id);
  return result;
};

export const editJob = async (id, options) => {
  const result = await edit(`jobs`, id, options);
  return result;
};
