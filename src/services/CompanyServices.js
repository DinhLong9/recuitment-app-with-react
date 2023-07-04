import { get } from "../utils/request";
import { post } from "../utils/request";

export const getCompany = async () => {
  const result = await get(`company`);
  return result;
};

export const getCompanyDetails = async (id) => {
  const result = await get(`company/${id}`);
  return result;
};

export const createCompany = async (options) => {
  const result = await post(`company`, options);
  return result;
};

export const login = async (email, password) => {
  const result = await get(`company?email=${email}&password=${password}`);
  return result;
};
