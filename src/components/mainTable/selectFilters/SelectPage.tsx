import { PageTypeOption } from '../../../redux/actions/productAction';
import '../Table.css'
import useApiData from '../hooks/useApiData';
import GeneralFilter from '../filter/GeneralFilter';
import { useSelector } from 'react-redux';

/**
 * SelectPage.tsx - 페이지 타입을 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectPage() {
  const apiPage = useApiData('/api/v1/raw-data-category/page-type', 'page_type');
  const page = useSelector((state: any) => state.product.PageTypeOption);

  return (
     <GeneralFilter
            label="Page Type"
            selectedValue={page}  
            action={PageTypeOption}  
            options={apiPage}
            buttonCSS = "filter-btn-sub"
            dropdownCSS = "limenu-sub"
        />
    );
}

export default SelectPage;