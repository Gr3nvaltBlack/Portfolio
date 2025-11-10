import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers/rootReducer'
import { getUsers } from "../actions/get.users.actions";

const store = configureStore({
  reducer: rootReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
})

store.dispatch(getUsers); // ??
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
