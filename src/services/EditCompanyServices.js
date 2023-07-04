import { edit } from "../utils/request";

export const editCompany = async (id, options) => {
  const result = await edit(`company`, id, options);
  return result;
};
