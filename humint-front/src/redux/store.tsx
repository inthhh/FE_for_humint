// store.ts
import { legacy_createStore as createStore, Action, AnyAction } from "redux";

// 초기 상태
interface AppState {
  DateOption: string | null;
  ResultOption: string | null;
  SiteCodeOption: string | null;
}

// 액션 타입 정의
const SET_DATE = "SET_DATE";
const SET_RESULT = "SET_RESULT";
const SET_SITECODE = "SET_SITECODE";

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
  // 추가된 부분
  type: SET_SITECODE,
  payload: code,
});


// 리듀서 함수
const reducer = (
  state: AppState = {
    DateOption: null,
    ResultOption: null,
    SiteCodeOption: null,
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
    case SET_SITECODE: // 추가된 부분
      return {
        ...state,
        SiteCodeOption: action.payload,
      };
    
    default:
      return state;
  }
};

// Redux 스토어 생성
const store = createStore(reducer);

export default store;