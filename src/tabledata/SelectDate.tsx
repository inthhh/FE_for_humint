import React, { useEffect, useState } from 'react';
import { DateOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import './Table.css'
import axios from 'axios';

function SelectDate() {
  const [isDropdownView, setDropdownView] = useState(false)
  // const today = new Date();
  // const sevendaysago = new Date(today.getTime()-6*24*60*60*1000);
  // const dateList: string[] = [];
  // for(let date=sevendaysago; date<=today; date.setDate(date.getDate()+1)){
  //   const formatDate = date.toISOString().split('T')[0];
  //   dateList.push(formatDate);
  // }
  // const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl = "http://121.252.183.23:8080"
  
  const [apiDate, setApiDate] = useState([]);

  const dateAPI = async()=>{
    try{
        const {data} = await axios.get(`${apiUrl}/api/v1/raw-data-category/date`)
        setApiDate(data.data);
    } catch(e){
        console.error('dateReasonAPI 호출 에러:', e);
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
    

    const dispatch = useDispatch();
    const date = useSelector((state: any) => state.DateOption);
    
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
          zIndex: 1,
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