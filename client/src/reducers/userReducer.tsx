export const initialState = null;

export const reducer = (state: any, action: any) => {
  if (action.type === "USER") {
    return action.payload;
  }
  if (action.type === "CLEAR") {
    return null;
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      country: action.payload.country,
      user_address: action.payload.user_address,
      user_password: action.payload.user_password,
    };
  }
  return state;
};
