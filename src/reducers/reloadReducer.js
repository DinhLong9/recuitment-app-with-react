export const reloadReducer = (state = "", action) => {
  //   console.log(state, action);
  switch (action.type) {
    case "CURRENT_COMPONENT":
      return action.key;
    default:
      return state;
  }
};
