import axios from 'axios';
import exp from 'constants';

/**
 * @function
 * tableApi.ts - Table Data 전체를 받아오는 API를 호출합니다.
 */
export const getAPI_ = async (apiUrl: string, date: number, ct: string, result: string, pagetype: string, component: string, device: string) => {
    try {
        const params = new URLSearchParams({
            date: String(date),
            'site-code': ct,
            ...(result && {'check-result': result}),
            ...(pagetype && {'page-type': pagetype}),
            ...(component && {component}),
            ...(device && {'description': device}),
        });

        const{ data } = await axios.get(`${apiUrl}/api/v1/raw-data?${params.toString()}`);
        return data.data;
    } catch (e) {
        console.error('getAPI 에러:', e);
        return "error";
    }
};

/**
 * @function
 * tableApi.ts - product ID 검색 결과를 조회하는 API를 호출합니다.
 */
export const searchAPI_ = async (searchId: string, apiUrl: string) => {
    try {
        console.log(searchId);
        const { data } = await axios.get(`${apiUrl}/api/v1/raw-data/${searchId}`)
        console.log("검색 data : ", data.data);
        return data.data;
    } catch (e) {
        console.error('searchAPI 에러:', e);
        return "error";
    }
};

/**
 * @function
 * tableApi.ts - Check 결과&가이드 값 수정 후 저장하는 API를 호출합니다.
 * @param apiUrl 
 * @param YN 
 * @param name 
 * @param id 
 * @param ri 
 * @param idlist 
 * @returns 
 */
export const editAPI_ = async (apiUrl: string, YN: string, name: string | null, id: number, ri: number, idlist: number[]) => {
    try {
        console.log("edit go ", idlist);

        console.log(name)
        const { data } = await axios.patch(`${apiUrl}/api/v1/raw-data/${id}`, {
            "checkResult": YN,
            "checkReason": idlist, // id값의 배열
            "user": (name ? name : '')
        },
        );
        console.log("저장 완료", YN, idlist);
        console.log(data);

        return data;

    } catch (e) {
        console.error('API 호출 에러:', e);
        alert("[저장 실패]\n바른 형식으로 저장해주세요.");
        return "error";
    }
}

/**
 * @function
 * tableApi.ts - 각 행의 Title에 맞는 가이드 목록을 받아오는 API를 호출합니다.
 * @param apiUrl 
 * @returns 
 */
export const getGuideAPI_ = async (apiUrl: string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/v1/raw-data-category/check-reason`);
        return data.data;
    } catch (e) {
        console.error('guide API 호출 에러:', e);
        return "error";
    }
}