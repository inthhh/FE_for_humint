import React, { useEffect, useState } from 'react';
import { DateOption } from '../../../redux/actions/productAction';
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'
import axios from 'axios';
import { RootState } from '../../../interfaces/interfaceRedux';

/**
 * SelectDate.tsx - 날짜 정보를 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectDate() {
  const [isDropdownView, setDropdownView] = useState(false)
  const apiUrl = "http://121.252.183.23:8080"
  const [apiDate, setApiDate] = useState([]);
  const dispatch = useDispatch();
  const date = useSelector((state: RootState) => state.product.DateOption);

  /**
   * @function
   * 데이터가 존재하는 날짜 정보를 API로 호출하는 함수입니다.
   */
  const dateAPI = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/v1/raw-data-category/date`)
      console.log(data.data)
      const sortedData = data.data.sort((a: { date: string }, b: { date: string }) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      console.log(data.data)
      setApiDate(sortedData);
    } catch (e) {
      console.error('dateAPI 호출 에러:', e);
    }
  }

  useEffect(() => {
    dateAPI();
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
  const handleBlurContainer = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setTimeout(() => {
        setDropdownView(false)
      }, 200);
    }
  }

  /**
   * @function
   * 드롭다운 요소 클릭 이벤트 함수입니다.
   * @param i 
   */
  const onClickEvent = (i: string) => {
    dispatch(DateOption(i));
    setDropdownView(false);
  };

  return (
    <div className="container" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button className='filter-btn'>QA Date : {date}{isDropdownView ? '▲' : '▼'}</button>
      </label>
      {isDropdownView && (<ul style={{
        listStyle: 'none',
        position: 'absolute',
        zIndex: 9,
        maxHeight: '300px', overflowY: 'auto',
        margin: 0,
        padding: 0
      }}>
        {apiDate.map((item: { date: string }, i: number) => (
          <li key={i} onMouseDown={(e) => { e.preventDefault() }} onClick={() => onClickEvent(item.date)} className='limenu'>{item.date}</li>
        ))}
      </ul>)}
    </div>
  )

}

export default SelectDate;