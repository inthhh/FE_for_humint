// store.ts
import { legacy_createStore as createStore, Action, AnyAction } from "redux";
import { getCookie } from "../utils/cookieUtils";

// 초기 상태
interface AppState {
  DateOption: string | null;
  ResultOption: string | null;
  SiteCodeOption: string | null;
  PageTypeOption: string | null;
  myName: string | null;
}

// 오늘 날짜를 가져오는 함수
const getTodayDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// 액션 타입 정의
const SET_DATE = "SET_DATE";
const SET_RESULT = "SET_RESULT";
const SET_SITECODE = "SET_SITECODE";
const SET_MYNAME = "SET_MYNAME";
const SET_PAGETYPE = "SET_PAGETYPE"

// 액션 생성자 함수
export const DateOption = (date: string | null): AnyAction => ({
  type: SET_DATE,
  payload: date,
});

export const ResultOption = (result: string | null): AnyAction => ({
  type: SET_RESULT,
  payload: result,
});

export const SiteCodeOption = (code: string | null): AnyAction => ({
  type: SET_SITECODE,
  payload: code,
});

export const myName = (myname: string | null): AnyAction => ({
  type: SET_MYNAME,
  payload: myname,
});

export const PageTypeOption = (page: string | null): AnyAction => ({
  type: SET_PAGETYPE,
  payload: page,
});

// 리듀서 함수
const reducer = (
  state: AppState = {
    DateOption: getTodayDate(), // 오늘 날짜로 초기화
    ResultOption: "", // "ALL"로 초기화
    SiteCodeOption: "uk", // "uk"로 초기화
    myName: getCookie('myName'),
    PageTypeOption : ""
  },
  action: AnyAction
): AppState => {
  switch (action.type) {
    case SET_DATE:
      return {
        ...state,
        DateOption: action.payload,
      };
    case SET_RESULT:
      return {
        ...state,
        ResultOption: action.payload,
      };
    case SET_SITECODE:
      return {
        ...state,
        SiteCodeOption: action.payload,
      };
    case SET_MYNAME:
      return {
        ...state,
        myName: action.payload,
      };
      case SET_PAGETYPE:
        return {
          ...state,
          PageTypeOption: action.payload,
        };
    default:
      return state;
  }
};

// Redux 스토어 생성
const store = createStore(reducer);

export default store;
