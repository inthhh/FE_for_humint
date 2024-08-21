import { AnyAction } from "redux";
import { getCookie } from "../../utils/cookieUtils";
import { SET_MYNAME } from "../constants/userConstant";
import { UserState } from "../interfacesRedux";

export const userReducer = (
    state: UserState = {
        myName: getCookie('myName'),
    },
    action: AnyAction
): UserState => {
    switch (action.type) {
        case SET_MYNAME:
            return {
                ...state,
                myName: action.payload,
            };
        default:
            return state;
    }
};