import React, { useState } from 'react';
import { ResultOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'

/**
 * SelectResult.tsx - 결과값(Y/N)을 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectResult() {
  const [isDropdownView, setDropdownView] = useState(false)
  const dispatch = useDispatch();
  const yn = useSelector((state: any) => state.ResultOption);

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
      dispatch(ResultOption(''))
    }
    else dispatch(ResultOption(i)); // Y or N
  };

  return (
    <div className="container" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button className='filter-btn'>Check Result : {yn == '' ? ('ALL') : (`${yn}`)} {isDropdownView ? '▲' : '▼'}</button>
      </label>
      {isDropdownView && (<ul style={{
        listStyle: 'none', position: 'absolute',
        zIndex: 9,
        margin: 0, padding: 0
      }}>
        <li className='limenu' onMouseDown={(e) => {
          e.preventDefault()
        }} onClick={() => onClickEvent("ALL")}>ALL</li>
        <li className='limenu' onMouseDown={(e) => {
          e.preventDefault()
        }} onClick={() => onClickEvent('Y')}>Y</li>
        <li className='limenu' onMouseDown={(e) => {
          e.preventDefault()
        }} onClick={() => onClickEvent('N')}>N</li>

      </ul>)}
    </div>
  )
}

export default SelectResult;