import axios from 'axios';
import exp from 'constants';

// Table Data 전체를 받아오는 API
export const getAPI = async (apiUrl:string, date:number, ct:string, result:string, pagetype:string) => {
    try {
      if(pagetype && result){
          const {data} = await axios.get(`${apiUrl}/api/v1/raw-data?date=${date}&site-code=${ct}&check-result=${result}&page-type=${pagetype}`);
          return data.data;
      }
      else if(result){
          const {data} = await axios.get(`${apiUrl}/api/v1/raw-data?date=${date}&site-code=${ct}&check-result=${result}`);
          return data.data;
      }
      else if(pagetype){
          const {data} = await axios.get(`${apiUrl}/api/v1/raw-data?date=${date}&site-code=${ct}&page-type=${pagetype}`);
          return data.data;
      }
      else{
          const {data} = await axios.get(`${apiUrl}/api/v1/raw-data?date=${date}&site-code=${ct}`);
          return data.data;
      }
  } catch (e) {
    console.error('getAPI 에러:', e);
    return "error";
  }
};

// product ID 검색 결과를 받아오는 API
export const searchAPI = async(searchId: string, apiUrl:string)=>{
    try{
        console.log(searchId);
        const {data} = await axios.get(`${apiUrl}/api/v1/raw-data/${searchId}`)
        console.log("검색 data : ", data.data);
        return data.data;
    } catch (e) {
        console.error('searchAPI 에러:', e);
        return "error";
    }
};


// Check 결과&가이드 값 수정 후 저장하는 API
export const editAPI = async(apiUrl:string, YN:string, name:string|null, id: number, ri:number, idlist:number[]) => {
    try {
        console.log("edit go ", idlist);
        
        console.log(name)
        const { data } = await axios.patch(`${apiUrl}/api/v1/raw-data/${id}`,{
          "checkResult": YN,
          "checkReason": idlist, // id값의 배열
          "user": (name? name : '')
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

// 각 행의 Title에 맞는 가이드 목록을 받아오는 API
export const getGuideAPI = async (apiUrl:string) => {
    try {
        const { data } = await axios.get(`${apiUrl}/api/v1/raw-data-category/check-reason`);
        return data.data;
    } catch (e) {
        console.error('guide API 호출 에러:', e);
        return "error";
    }
}