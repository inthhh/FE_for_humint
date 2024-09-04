import { SiteCodeOption } from '../../../redux/actions/productAction';
import { useSelector } from "react-redux";
import '../Table.css'
import { countryCodes } from '../../../constants/filterOptions';
import GeneralFilter from '../filter/GeneralFilter';

/**
 * SelectSiteCode.tsx - 국가 코드를 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectSiteCode() {

  const site = useSelector((state: any) => state.product.SiteCodeOption);

        return (
            <GeneralFilter
                label="Site Code"
                selectedValue={site} 
                action={SiteCodeOption}
                options={countryCodes}
            />
        );
}

export default SelectSiteCode;