export const loginReducer = (state = false, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "Login__Reload":
      return action.status;
    default:
      return state;
  }
};
