import { DeviceOption } from '../../../redux/actions/productAction';
import useApiData from "../hooks/useApiData";
import GeneralFilter from "../filter/GeneralFilter";
import { baseDeviceList } from "../../../constants/filterOptions";
import { useSelector } from 'react-redux';
import { ProductState } from '../../../interfaces/interfaceRedux';

function SelectDevice() {
    const device = useSelector((state: any) => state.product.DeviceOption);
    const apiDevice = useApiData(`/api/v1/raw-data?description=${device || "ALL"}`, 'device');

    return (
        <GeneralFilter
                label="Device"
                selectedValue={device}  
                action={DeviceOption}  
                options={[...baseDeviceList, ...apiDevice]}
                buttonCSS = "filter-btn-sub"
                dropdownCSS = "limenu-sub"
        />
    );
}

export default SelectDevice;