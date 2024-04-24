import React, { useEffect, useState } from 'react';
import { DateOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import './Table.css'

function SelectDate() {
  const [isDropdownView, setDropdownView] = useState(false)
  const today = new Date();
  const sevendaysago = new Date(today.getTime()-6*24*60*60*1000);
  const dateList: string[] = [];
  for(let date=sevendaysago; date<=today; date.setDate(date.getDate()+1)){
    const formatDate = date.toISOString().split('T')[0];
    dateList.push(formatDate);
  }
  
    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }
  
    // const handleBlurContainer = () => {
    //   setTimeout(() => {
    //     setDropdownView(false)
    //   }, 200);
    // }

    const handleBlurContainer = (e: React.FocusEvent<HTMLDivElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setTimeout(() => {
          setDropdownView(false)
        }, 200);
      }
    }
    

    const dispatch = useDispatch();
    const date = useSelector((state: any) => state.DateOption);
    
    const onClickEvent=(i:number)=>{
      console.log(i);
      dispatch(DateOption(dateList[i]));
    };

    return (
      <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
          <button className='filter-btn'>QA Date : {date}{isDropdownView ? '▲' : '▼'}</button>
        </label>
        {isDropdownView && (<ul style={{listStyle:'none', position: 'absolute', 
        zIndex: 1,
        margin: 0, padding: 0 }}>
          {
            Array(7).fill('').map((li, i) => (
              <li onMouseDown={(e) => {
                e.preventDefault()
              }} onClick={() => onClickEvent(i)} className='limenu' >{dateList[i]}</li>
            ))
          }
        </ul>)}
      </div>
    )
  
}

export default SelectDate;