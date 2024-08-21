import { AnyAction } from "redux";
import { SET_MYNAME } from "../constants/userConstant";

export const myName = (myname: string | null): AnyAction => ({
    type: SET_MYNAME,
    payload: myname,
});