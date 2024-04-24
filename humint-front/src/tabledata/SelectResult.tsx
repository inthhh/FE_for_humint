import React, { useState } from 'react';
import { ResultOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

function SelectResult() {
    const [isDropdownView, setDropdownView] = useState(false)
    
  
    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }
  
    const handleBlurContainer = () => {
      setTimeout(() => {
        setDropdownView(false)
      }, 200);
    }
  
    const dispatch = useDispatch();
    const yn = useSelector((state: any) => state.ResultOption);
    const onClickEvent=(i:string)=>{
      if(i=="ALL") {
        dispatch(ResultOption(''))

      }
      else dispatch(ResultOption(i)); // Y or N
    };
    console.log(yn);

    return (
      <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
          <button>Check Result : {yn==''?('ALL'):(`${yn}`)} {isDropdownView ? '▲' : '▼'}</button>
        </label>
        {isDropdownView && (<ul style={{listStyle:'none',position: 'absolute', 
        backgroundColor: 'lightgray',zIndex: 1,
        margin: 0, padding: 0 }}>
            <li style={{marginTop:"5px" }} onMouseDown={(e) => {
                e.preventDefault()
              }} onClick={() => onClickEvent("ALL")}>ALL</li>
            <li style={{marginTop:"5px" }} onMouseDown={(e) => {
                e.preventDefault()
              }} onClick={() => onClickEvent('Y')}>Y</li>
            <li style={{marginTop:"5px" }} onMouseDown={(e) => {
                e.preventDefault()
              }} onClick={() => onClickEvent('N')}>N</li>

        </ul>)}
      </div>
    )
}

export default SelectResult;