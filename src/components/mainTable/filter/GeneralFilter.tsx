import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonFilter from "../CommonFilter"
import { GeneralFilterProps } from "../../../interfaces/interfaceTable";

function GeneralFilter({label, selectedValue, action, options, defaultValue = "ALL", buttonCSS = 'filter-btn', dropdownCSS = 'limenu',}: GeneralFilterProps) {
    const dispatch = useDispatch();

    const handleOptionChange = (value: string) => {
        dispatch(action(value));
    };

    return (
        <CommonFilter
            label={label}
            currentValue={selectedValue || defaultValue}
            options={options}
            onOptionChange={handleOptionChange}
            buttonCSS={buttonCSS}
            dropdownCSS={dropdownCSS}
        />
    );
}

export default GeneralFilter;