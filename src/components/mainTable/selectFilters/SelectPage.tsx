import React, { useEffect, useState } from 'react';
import { PageTypeOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'
import axios from 'axios';

/**
 * SelectPage.tsx - 페이지 타입을 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectPage() {
  const [isDropdownView, setDropdownView] = useState(false)
  const apiUrl = "http://121.252.183.23:8080"
  const [apiPage, setApiPage] = useState([]);
  const dispatch = useDispatch();
  const pageType = useSelector((state: any) => state.PageTypeOption);

  /**
   * @function
   * 페이지 타입 종류 API를 호출하는 함수입니다.
   */
  const pageTypeAPI = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/raw-data-category/page-type`)
      console.log(data.data)
      setApiPage(data.data);
    } catch (e) {
      console.error('pagetypeAPI 호출 에러:', e);
    }
  }

  useEffect(() => {
    pageTypeAPI();
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
      dispatch(PageTypeOption(''))
    }
    else dispatch(PageTypeOption(i)); // home or offer
  };

  return (
    <div className="container" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button className='filter-btn'> Page Type : {pageType == '' ? ('ALL') : (`${pageType}`)} {isDropdownView ? '▲' : '▼'}</button>
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
        {apiPage.map((item: { page_type: string }, i: number) => (
          <li key={i} onMouseDown={(e) => { e.preventDefault() }} onClick={() => onClickEvent(item.page_type)} className='limenu'>{item.page_type}</li>
        ))}
      </ul>)}
    </div>
  )
}

export default SelectPage;