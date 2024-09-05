import { ComponentOption } from '../../../redux/actions/productAction';
import GeneralFilter from "../filter/GeneralFilter";
import useApiData from "../hooks/useApiData";
import { baseComponentList } from "../../../constants/filterOptions";
import { useSelector } from 'react-redux';


/**
 * SelectComponent.tsx - 컴포넌트(KV, co05)를 필터링하는 드롭다운 컴포넌트입니다.
 * @returns
 */
function SelectComponent() {
    const apiComponent = useApiData('/api/v1/raw-data/component', 'component').filter(item => item.trim() !== '');
    const component = useSelector((state: any) => state.product.ComponentOption);

    return (
        <GeneralFilter
                label="Page Type"
                selectedValue={component}  
                action={ComponentOption}  
                options={[...baseComponentList, ...apiComponent]}
                buttonCSS = "filter-btn-sub"
                dropdownCSS = "limenu-sub"
        />
    );
}

export default SelectComponent;
