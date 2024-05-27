import axios from 'axios';

export const getAPI = async (apiUrl:string, date:number, ct:string, result:string, pagetype:string) => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v2/raw-data?date=${date}&site-code=${ct}&check-result=${result}&page-type=${pagetype}`);
    //   setDataList([...data.data]);
      console.log("data", data.data);
      return data.data;
    //   setDataBackup([...data.data]);
    } catch (e) {
      console.error('API 호출 에러:', e);
    }
};
