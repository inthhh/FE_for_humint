import React, { useState } from 'react';
import { DateOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

function SelectDate() {
  const [isDropdownView, setDropdownView] = useState(false)
  const today = new Date();
  const sevendaysago = new Date(today.getTime()-7*24*60*60*1000);
  const dateList: string[] = [];
  for(let date=sevendaysago; date<=today; date.setDate(date.getDate()+1)){
    const formatDate = date.toISOString().split('T')[0];
    dateList.push(formatDate);
  }
  
    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }
  
    const handleBlurContainer = () => {
      setTimeout(() => {
        setDropdownView(false)
      }, 200);
    }

    const dispatch = useDispatch();
    const date = useSelector((state: any) => state.DateOption);
    const onClickEvent=(i:number)=>{
      dispatch(DateOption(dateList[i+1]));
    };
    console.log(date);
    return (
      <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
          <button>QA Date : {date}{isDropdownView ? '▲' : '▼'}</button>
        </label>
        {isDropdownView && (<ul style={{listStyle:'none'}}>
          {
            Array(7).fill('').map((li, i) => (
              <li onClick={() => onClickEvent(i)}>{dateList[i + 1]}</li>
            ))
          }
        </ul>)}
      </div>
    )
  
}

export default SelectDate;