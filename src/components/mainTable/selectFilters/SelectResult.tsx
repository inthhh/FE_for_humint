import React, { useState } from 'react';
import { ResultOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'

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
      setDropdownView(false);
      if(i=="ALL") {
        dispatch(ResultOption(''))
      }
      else dispatch(ResultOption(i)); // Y or N
    };

    return (
      <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
          <button className='filter-btn'>Check Result : {yn==''?('ALL'):(`${yn}`)} {isDropdownView ? '▲' : '▼'}</button>
        </label>
        {isDropdownView && (<ul style={{listStyle:'none',position: 'absolute', 
        zIndex: 9,
        margin: 0, padding: 0 }}>
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