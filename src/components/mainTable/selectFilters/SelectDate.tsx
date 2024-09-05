import { useSelector } from 'react-redux';
import { DateOption } from '../../../redux/actions/productAction';
import GeneralFilter from '../filter/GeneralFilter';
import useApiData from '../hooks/useApiData';
import '../Table.css'

/**
 * SelectDate.tsx - 날짜 정보를 필터링하는 드롭다운 컴포넌트
 * @returns 
 */
function SelectDate(){

  const apiDate = useApiData('/api/v1/raw-data-category/date', 'date');
  const date = useSelector((state: any) => state.product.DateOption);
  const sortedDates = apiDate.sort((a: string, b: string) => new Date(b).getTime() - new Date(a).getTime());

  return (
     <GeneralFilter
            label="QA Date"
            selectedValue={date}  
            action={DateOption}  
            options={sortedDates}
        />
    );
}

export default SelectDate;