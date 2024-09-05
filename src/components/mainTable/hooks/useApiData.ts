import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function useApiData<T>(endpoint: string, field: keyof T): string[] {
    const [data, setData] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}${endpoint}`);

                let extractedData: string[] = [];

                if (Array.isArray(response.data)) {
                    extractedData = response.data.map((item: T) => item[field] as unknown as string);
                } else if (Array.isArray(response.data.data)) {
                    extractedData = response.data.data.map((item: T) => item[field] as unknown as string);
                } else {
                    console.error("데이터 구조 확인 필요", response.data);
                }

                setData(extractedData);
            } catch (error) {
                console.error(`${endpoint}에서 데이터 호출 에러`, error);
            }
        };

        fetchData();
    }, [endpoint, field]);

    return data;
}

export default useApiData;
