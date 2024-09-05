import { AnyAction } from "redux";
import { SET_DATE, SET_RESULT, SET_SITECODE, SET_PAGETYPE, SET_COMPONENT, SET_DEVICE } from "../constants/productConstant";

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

export const PageTypeOption = (page: string | null): AnyAction => ({
    type: SET_PAGETYPE,
    payload: page,
});

export const ComponentOption = (component: string | null): AnyAction => ({
    type: SET_COMPONENT,
    payload: component,
})

export const DeviceOption = (device: string | null): AnyAction => ({
    type: SET_DEVICE,
    payload: device,
})
