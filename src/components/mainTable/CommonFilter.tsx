import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CommonFilterProps } from "../../interfaces/interfaceTable";
import LabelComponent from "./filter/Label";
import OptionsComponent from "./filter/Options";
import { ProductState} from "../../interfaces/interfaceRedux";
import { ComponentOption, DateOption, DeviceOption, PageTypeOption, ResultOption, SiteCodeOption } from "../../redux/actions/productAction";
import { countryCodes, ynOptions, baseComponentList, baseDeviceList } from "../../constants/filterOptions";

const apiUrl = process.env.REACT_APP_API_URL;


/**
 * CommonFilter.tsx - 다양한 필터의 공통적인 속성을 정리한 컴포넌트
 * @returns 
 */ 
function CommonFilter({ label, currentValue, options, onOptionChange, buttonCSS = 'filter-btn', dropdownCSS = 'limenu'}: CommonFilterProps) {
    const [isDropdownView, setDropdownView] = useState(false);
    
    /**
     * @function
     * 드롭다운 요소 클릭 시, 바로 드롭다운 view 상태를 변경하는 이벤트 함수
     */
    const handleClickContainer = () => {
        setDropdownView(!isDropdownView);
    };

    /**
     * @function
     * 드롭다운 외부 포커스를 감지하는 이벤트 함수
     * @param e 
     */
    const handleBlurContainer = () => {
        setTimeout(() => {
            setDropdownView(false);
        }, 200);
    };

    /**
     * @function
     * 드롭다운 요소 클릭 이벤트 함수
     * @param option
     */
    const handleOptionClick = (option: string) => {
        setDropdownView(false);
        onOptionChange(option === "ALL" ? "" : option);
    };

    return (
        <div className="container" onBlur={handleBlurContainer}>
            <LabelComponent 
                label={label} 
                currentValue={currentValue} 
                isDropdownView={isDropdownView} 
                handleClick={handleClickContainer} 
                buttonCSS={buttonCSS} 
            />
            {isDropdownView && (
                <OptionsComponent 
                    options={options} 
                    handleOptionClick={handleOptionClick} 
                    dropdownCSS={dropdownCSS} 
                />
            )}
        </div>
    );
}

export default CommonFilter;
