export const reload = (key) => {
  return {
    type: "CURRENT_COMPONENT",
    key: key,
  };
};
