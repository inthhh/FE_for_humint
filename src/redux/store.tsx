// store.ts
import { userReducer } from "./reducers/userReducer";
import { productReducer } from "./reducers/productReducer";
import { configureStore } from '@reduxjs/toolkit';

// 오늘 날짜를 가져오는 함수
export const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Redux 스토어 생성
export const store = configureStore({
  reducer:{
    user: userReducer,
    product: productReducer
  }
});
