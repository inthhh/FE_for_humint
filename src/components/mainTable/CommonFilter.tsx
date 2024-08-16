import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {AppState, DateOption, SiteCodeOption, PageTypeOption, ResultOption, ComponentOption, DeviceOption, } from "../../redux/store";

const apiUrl = process.env.REACT_APP_API_URL;

/**
 * 공통적인 필터 드롭다운 컴포넌트의 속성 타입 정의
 * 
 * @typedef {Object} FilterDropdownProps
 * @property {string} label - 드롭다운의 라벨 텍스트
 * @property {string} currentValue - 현재 선택된 값
 * @property {string[]} options - 드롭다운에 표시될 옵션 배열
 * @property {function(string): void} onOptionChange - 선택된 값이 변경될 때 호출되는 콜백 함수
 * @property {'primary' | 'sub'} [filterType] - 드롭다운 버튼 스타일 타입
 */
interface FilterDropdownProps { //다양한 데이터 렌더링 시 ReactNode 사용
    label: string;
    currentValue: string;
    options: string[];
    onOptionChange: (value: string) => void;
    buttonCSS?: string; // 드롭다운 버튼 CSS
    dropdownCSS?: string; // 드롭다운 리스트 CSS
}

/**
 * CommonFilter.tsx - 다양한 필터의 공통적인 속성을 정리한 컴포넌트
 * @returns 
 */ 
function FilterDropdown({ label, currentValue, options, onOptionChange, buttonCSS = 'filter-btn', dropdownCSS = 'limenu'}: FilterDropdownProps) {
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
        if (option === "ALL") {
            onOptionChange("");
        } else {
            onOptionChange(option);
        }
    };

    return (
        <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
            <button className={buttonCSS}>
                {label}: {currentValue || "ALL"} {isDropdownView ? "▲" : "▼"}
            </button>
        </label>
        {isDropdownView && (
            <ul
                style={{
                    listStyle: "none",
                    position: "absolute",
                    zIndex: 9,
                    maxHeight: "300px",
                    overflowY: "auto",
                    margin: 0,
                    padding: 0,
                }}
            >
            {options.map((option, i) => (
                <li
                    key={i}
                    className={dropdownCSS}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleOptionClick(option)}
                >
                    {option}
                </li>
            ))}
            </ul>
        )}
        </div>
    );
}

/**
 * API 호출 및 데이터 정렬 처리
 * @returns 
 */ 
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
                    // 데이터가 객체 내의 data 필드에 있는 경우 처리
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

export const Filters = {
    /**
     * SelectDate - 날짜 정보를 필터링하는 드롭다운 컴포넌트
     * @returns 
     */
    SelectDate: () => {
        const dispatch = useDispatch();
        const date = useSelector((state: AppState) => state.DateOption);
        const apiDate = useApiData<{ date: string }>('/api/v1/raw-data-category/date', 'date');
        
        return (
            <FilterDropdown
                label="QA Date"
                currentValue={date || ""}
                options={apiDate}
                onOptionChange={(value) => dispatch(DateOption(value))}
            />
        );
    },

    /**
     * SelectSiteCode - 국가 코드를 필터링하는 드롭다운 컴포넌트
     * @returns 
     */
    SelectSiteCode: () => {
        const dispatch = useDispatch();
        const siteCode = useSelector((state: AppState) => state.SiteCodeOption);
        const countryCodes: string[] = [
        "ae", "ae_ar", "africa_en", "africa_fr", "africa_pt", "al", "ar", "at", 
        "au", "az", "ba", "bd", "be", "be_fr", "bg", "br", "ca", "ca_fr", "ch", 
        "ch_fr", "cl", "cn", "co", "cz", "de", "dk", "ee", "eg", "es", "fi", 
        "fr", "ge", "gr", "hk", "hk_en", "hr", "hu", "id", "ie", "il", "in", 
        "iq_ar", "iq_ku", "iran", "it", "jp", "kz_kz", "kz_ru", "latin", 
        "latin_en", "lb", "levant", "levant_ar", "lt", "lv", "mk", "mm", 
        "mn", "mx", "my", "n_africa", "nl", "no", "nz", "pe", "ph", "pk", 
        "pl", "ps", "pt", "py", "ro", "rs", "ru", "sa", "sa_en", "se", "sec", 
        "sg", "si", "sk", "th", "tr", "tw", "ua", "uk", "us", "uy", "uz_ru", 
        "uz_uz", "vn", "za"
        ];

        return (
            <FilterDropdown
                label="Site Code"
                currentValue={siteCode || ""}
                options={countryCodes}
                onOptionChange={(value) => dispatch(SiteCodeOption(value))}
            />
        );
    },

    /**
     * SelectPage - 페이지 타입(Home, Offer)을 필터링하는 드롭다운 컴포넌트
     * @returns 
     */
    SelectPage: () => {
        const dispatch = useDispatch();
        const pageType = useSelector((state: AppState) => state.PageTypeOption);
        const apiPage = useApiData<{ page_type: string }>('/api/v1/raw-data-category/page-type', 'page_type');

        useEffect(() => {
            console.log("apiPage in SelectPage:", apiPage);  // apiPage 값이 무엇인지 확인
        }, [apiPage]);

        return (
            <FilterDropdown
                label="Page Type"
                currentValue={pageType || "ALL"}
                options={["ALL", ...apiPage]}
                onOptionChange={(value) => dispatch(PageTypeOption(value))}
                buttonCSS = "filter-btn-sub"
                dropdownCSS = "limenu-sub"
            />
        );
    },

    /**
     * SelectResult - 결과값(Y/N)을 필터링하는 드롭다운 컴포넌트
     * @returns 
     */
    SelectResult: () => {
        const dispatch = useDispatch();
        const yn = useSelector((state: AppState) => state.ResultOption); 
        const ynOptions = ["ALL", "Y", "N"];

        return (
            <FilterDropdown
                label="Check Result"
                currentValue={yn || "ALL"}
                options={ynOptions}
                onOptionChange={(value) => dispatch(ResultOption(value))}
                buttonCSS = "filter-btn-sub"
                dropdownCSS = "limenu-sub"
            />
        );
    },

    /**
     * SelectComponent - 컴포넌트(KV, co05)를 필터링하는 드롭다운 컴포넌트
     * @returns
     */
    SelectComponent: () => {
        const dispatch = useDispatch();
        const component = useSelector((state: AppState) => state.ComponentOption);
        const apiComponent = useApiData<{ component: string }>('/api/v1/raw-data/component', 'component').filter(item => item.trim() !== '');
    
        const baseComponentList = ["ALL", "KV", "co05"];
    
        return (
            <FilterDropdown
                label="Component"
                currentValue={component || "ALL"}
                options={[...baseComponentList, ...apiComponent]}
                onOptionChange={(value) => dispatch(ComponentOption(value))}
                buttonCSS = "filter-btn-sub"
                dropdownCSS = "limenu-sub"
            />
        );
    },
    
    /*
     * SelectDevice - 디바이스(desktop, mobile)을 필터링하는 드롭다운 컴포넌트
     */
    SelectDevice: () => {
        const dispatch = useDispatch();
        const device = useSelector((state: AppState) => state.DeviceOption);
        const apiDevice = useApiData<{ device: string }>(`/api/v1/raw-data?description=${device || "ALL"}`, 'device');
        
        const baseDeviceList = ["ALL", "Mobile", "Desktop"];

        return (
            <FilterDropdown
                label="Device"
                currentValue={device || "ALL"}
                options={[...baseDeviceList, ...apiDevice]}
                onOptionChange={(value) => dispatch(DeviceOption(value))}
                buttonCSS = "filter-btn-sub"
                dropdownCSS = "limenu-sub"
            />
        );
    },
};
