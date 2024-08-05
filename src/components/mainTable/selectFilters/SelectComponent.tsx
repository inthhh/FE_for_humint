import React, { useState, useEffect } from "react";
import { ComponentOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as dotenv from 'dotenv';

/**
 * SelectComponent.tsx - 컴포넌트(KV, co05)를 필터링하는 드롭다운 컴포넌트입니다.
 * @returns
 */
function SelectComponent() {
    const [isDropdownView, setDropdownView] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [apiPage, setApiPage] = useState([]);
    const dispatch = useDispatch();
    const component = useSelector((state:any) => state.ComponentOption);

    /**
     * @function
     * Raw data의 키를 호출하여 컴포넌트 부분을 추출하는 함수입니다.
     */
//API 적용 필요
    const ComponentAPI = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/api/v1/raw-data`)
            console.log(data.data)
            setApiPage(data.data);
        } catch (e) {
            console.error('ComponentAPI 호출 에러:', e);
        }
    }

    useEffect(() => {
        ComponentAPI();
    }, [])

    /**
     * @function
     * 드롭다운 요소 클릭 시, 바로 드롭다운 view 상태를 변경하는 이벤트 함수입니다.
     */
    const handleClickContainer = () => {
        setDropdownView(!isDropdownView)
    }

    /**
     * @function
     * 드롭다운 외부 포커스를 감지하는 이벤트 함수입니다.
     * @param e 
     */
    const handleBlurContainer = () => {
        setTimeout(() => {
        setDropdownView(false)
        }, 200);
    }

    /**
     * @function
     * 드롭다운 요소 클릭 이벤트 함수입니다.
     * @param i 
     */
    const onClickEvent = (i: string) => {
        setDropdownView(false);
        if (i == "ALL") {
        dispatch(ComponentOption(''))
        }
        else dispatch(ComponentOption(i)); // KV or co05
    };

    return (
        <div className="container" onBlur={handleBlurContainer}>
          <label onClick={handleClickContainer}>
            <button className='filter-btn'> Component : {component === '' ? ('ALL') : (`${component}`)} {isDropdownView ? '▲' : '▼'}</button>
          </label>
          {isDropdownView && (<ul style={{
            listStyle: 'none',
            position: 'absolute',
            zIndex: 9,
            maxHeight: '300px', overflowY: 'auto',
            margin: 0,
            padding: 0
          }}>
            <li className='limenu' onMouseDown={(e) => {
              e.preventDefault()
            }} onClick={() => onClickEvent("ALL")}>ALL</li>
            {apiPage.map((item: { component: string }, i: number) => (
              <li key={i} onMouseDown={(e) => { e.preventDefault() }} onClick={() => onClickEvent(item.component)} className='limenu'>{item.component}</li>
            ))}
          </ul>)}
        </div>
      )
}

export default SelectComponent;