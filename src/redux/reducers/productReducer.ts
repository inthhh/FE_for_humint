import { AnyAction } from "redux";
import { SET_DATE, SET_RESULT, SET_SITECODE, SET_PAGETYPE, SET_COMPONENT, SET_DEVICE } from "../constants/productConstant";
import { getTodayDate } from "../store";
import { ProductState } from "../../interfaces/interfaceRedux";

export const productReducer = (
    state: ProductState = {
        DateOption: getTodayDate(), // 오늘 날짜로 초기화
        ResultOption: "", // "ALL"로 초기화
        SiteCodeOption: "uk", // "uk"로 초기화
        PageTypeOption: "",
        ComponentOption: "",
        DeviceOption: "",
    },
    action: AnyAction
): ProductState => {
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
        case SET_PAGETYPE:
            return {
                ...state,
                PageTypeOption: action.payload,
            };
        case SET_COMPONENT:
            return {
                ...state,
                ComponentOption: action.payload,
            };
        case SET_DEVICE:
            return {
                ...state,
                DeviceOption: action.payload,
            }
        default:
            return state;
    }
};