import React, { useEffect, useState } from 'react';
import { DateOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'
import axios from 'axios';

function SelectDate() {
  const [isDropdownView, setDropdownView] = useState(false)
  const apiUrl = "http://121.252.183.23:8080"
  const [apiDate, setApiDate] = useState([]);
  const dispatch = useDispatch();
  const date = useSelector((state: any) => state.DateOption);

  const dateAPI = async()=>{
    try{
        const {data} = await axios.get(`${apiUrl}/api/v1/raw-data-category/date`)
        console.log(data.data)
        const sortedData = data.data.sort((a: { date: string }, b: { date: string }) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        console.log(data.data)
        setApiDate(sortedData);
    } catch(e){
        console.error('dateAPI 호출 에러:', e);
    }
  }

    useEffect(()=>{
      dateAPI();
    },[])
  
    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }

    const handleBlurContainer = (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setTimeout(() => {
          setDropdownView(false)
        }, 200);
      }
    }
    
    const onClickEvent=(i:string)=>{
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