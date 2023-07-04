import { post } from "../utils/request";
import { get } from "../utils/request";
import { del } from "../utils/request";
import { edit } from "../utils/request";

export const postCv = async (options) => {
  const result = await post(`cv`, options);
  return result;
};

export const getCvStatistic = async (id) => {
  const result = await get(`cv?idCompany=${id}`);
  return result;
};

export const getCvDetails = async (id) => {
  const result = await get(`cv?id=${id}`);
  return result;
};

export const deleteCV = async (id) => {
  const result = await del(`jobs`, id);
  return result;
};

export const editCv = async (id, options) => {
  const result = await edit(`cv`, id, options);
  return result;
};
