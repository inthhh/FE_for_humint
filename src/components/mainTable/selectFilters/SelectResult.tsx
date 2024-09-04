import { ResultOption } from '../../../redux/actions/productAction';
import '../Table.css'
import { ynOptions } from '../../../constants/filterOptions';
import GeneralFilter from '../filter/GeneralFilter';
import { useSelector } from 'react-redux';

/**
 * SelectResult.tsx - 결과값(Y/N)을 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectResult() {
  const result = useSelector((state: any) => state.product.ResultOption);

  return (
     <GeneralFilter
            label="Check Result"
            selectedValue={result}  
            action={ResultOption}  
            options={ynOptions}
            buttonCSS = "filter-btn-sub"
            dropdownCSS = "limenu-sub"
        />
    );
}

export default SelectResult;