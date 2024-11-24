import { combineReducers } from "@reduxjs/toolkit";
import usersReducer from "../slices/usersSlice";
import authReducer from "../slices/authSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  auth: authReducer,
});

export default rootReducer;
