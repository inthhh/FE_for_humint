import React, { useEffect, useState } from 'react';
import { ResultOption } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'
import axios from 'axios';

function SelectPage() {
    const [isDropdownView, setDropdownView] = useState(false)
    
    const apiUrl = "http://121.252.183.23:8080"
  
    const [apiPage, setApiPage] = useState([]);

    const pageTypeAPI = async()=>{
        try{
            const {data} = await axios.get(`${apiUrl}/api/v1/raw-data-category/page-type`)
            console.log(data.data)
            setApiPage(data.data);
        } catch(e){
            console.error('pagetypeAPI 호출 에러:', e);
        }
    }

    useEffect(()=>{
      pageTypeAPI();
    },[])
  
    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }
  
    const handleBlurContainer = () => {
      setTimeout(() => {
        setDropdownView(false)
      }, 200);
    }
  
    const dispatch = useDispatch();
    const pageType = "";
    useSelector((state: any) => state.ResultOption);

    const onClickEvent=(i:string)=>{
      setDropdownView(false);
      if(i=="ALL") {
        // dispatch(ResultOption(''))
      }
      // else dispatch(ResultOption(i)); // home or offer
    };

    return (
      <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
          <button className='filter-btn'> Page Type : {pageType==''?('ALL'):(`${pageType}`)} {isDropdownView ? '▲' : '▼'}</button>
        </label>
        {isDropdownView && (<ul style={{
          listStyle: 'none',
          position: 'absolute',
          zIndex: 1, 
          maxHeight: '300px', overflowY: 'auto',
          margin: 0,
          padding: 0
        }}>
          {apiPage.map((item: { pagetype: string }, i: number) => (
            <li key={i} onMouseDown={(e) => { e.preventDefault() }} onClick={() => onClickEvent(item.pagetype)} className='limenu'>{item.pagetype}</li>
          ))}
        </ul>)}
      </div>
    )
}

export default SelectPage;