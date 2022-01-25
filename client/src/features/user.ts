import { createSlice } from "@reduxjs/toolkit";

interface User {
  birth_date: string;
  browser_type: string;
  budget: string;
  card_password: string;
  country: string;
  created_at: string;
  email: string;
  first_name: string;
  ip_address: string;
  is_blocked: boolean;
  last_name: string;
  permission: string;
  updated_at: string;
  user_address: string;
  user_card: string;
  user_id: string;
  user_image: string;
  user_password: string;
}

const initialStateValue: User = {
  birth_date: "",
  browser_type: "",
  budget: "",
  card_password: "",
  country: "",
  created_at: "",
  email: "",
  first_name: "",
  ip_address: "",
  is_blocked: false,
  last_name: "",
  permission: "",
  updated_at: "",
  user_address: "",
  user_card: "",
  user_id: "",
  user_image: "",
  user_password: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
