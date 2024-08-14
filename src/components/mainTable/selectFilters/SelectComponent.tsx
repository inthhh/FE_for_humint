import React, { useState, useEffect } from "react";
import { ComponentOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";


/**
 * SelectComponent.tsx - 컴포넌트(KV, co05)를 필터링하는 드롭다운 컴포넌트입니다.
 * @returns
 */
function SelectComponent() {
    const [isDropdownView, setDropdownView] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [apiComponent, setApiComponent] = useState([]);
    const dispatch = useDispatch();
    const component = useSelector((state: any) => state.ComponentOption);

    // 컴포넌트 목록 정의
    const baseComponentList = ["ALL", "KV", "co05"];

    /**
     * @function
     * Raw data의 키를 호출하여 컴포넌트 부분을 추출하는 함수입니다.
     * @param filter 
     */
    const componentAPI = async (filter: string) => {
        try {
            const url = filter === "ALL" ? `${apiUrl}/api/v1/raw-data/component` : `${apiUrl}/api/v1/raw-data/component?component=${filter}`;
            const { data } = await axios.get(url);
            console.log(data.data);
            setApiComponent(data.data.map((item: { component: any; }) => item.component));
        } catch (e) {
            console.error('ComponentAPI 호출 에러:', e);
        }
    };

    useEffect(() => {
        componentAPI("ALL"); // 초기에는 "ALL" 데이터를 가져옵니다.
    }, []);

    /**
     * @function
     * 드롭다운 요소 클릭 시, 바로 드롭다운 view 상태를 변경하는 이벤트 함수입니다.
     */
    const handleClickContainer = () => {
        setDropdownView(!isDropdownView);
    };

    /**
     * @function
     * 드롭다운 외부 포커스를 감지하는 이벤트 함수입니다.
     */
    const handleBlurContainer = () => {
        setTimeout(() => {
            setDropdownView(false);
        }, 200);
    };

    /**
     * @function
     * 드롭다운 요소 클릭 이벤트 함수입니다.
     * @param i 
     */
    const onClickEvent = (i: string) => {
        setDropdownView(false);
        if (i === "ALL") {
            dispatch(ComponentOption(''));
        } else {
            dispatch(ComponentOption(i));
        }
        componentAPI(i); // 선택된 값을 필터로 사용하여 API 호출
    };

    return (
        <div className="container" onBlur={handleBlurContainer}>
            <label onClick={handleClickContainer}>
                <button className='filter-btn-sub'> Component : {component === '' ? 'ALL' : `${component}`} {isDropdownView ? '▲' : '▼'}</button>
            </label>
            {isDropdownView && (
                <ul style={{
                    listStyle: 'none',
                    position: 'absolute',
                    zIndex: 9,
                    maxHeight: '300px',
                    overflowY: 'auto',
                    margin: 0,
                    padding: 0
                }}>
                    {/* sub li */}
                    {baseComponentList.concat(apiComponent).map((item, i) => (
                        <li key={i} className='limenu-sub' onMouseDown={(e) => { e.preventDefault() }} onClick={() => onClickEvent(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SelectComponent;
