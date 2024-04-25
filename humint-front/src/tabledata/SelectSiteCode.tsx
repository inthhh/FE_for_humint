import React, { useState } from 'react';
import { SiteCodeOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import './Table.css'

function SelectSiteCode() {
    const [isDropdownView, setDropdownView] = useState(false)
    const Country: string[] = ['al', 'ar', 'at', 'au', 'az', 'ba', 'bd', 'be', 'be_fr', 'bg', 'br', 'ca', 'ca_fr', 'ch', 'ch_fr', 
    'cl', 'cn', 'co', 'cz', 'de', 'dk', 'ee', 'eg', 'es', 'fi', 'fr', 'ge', 'gr', 'hk', 'hk_en', 'hr', 'hu', 'id', 'ie', 'il', 'in', 'iran', 
    'iq_ar', 'iq_ku', 'it', 'jp', 'kz_kz', 'kz_ru', 'lb', 'latin', 'latin_en', 'levant', 'levant_ar', 'lt', 'lu', 'lv', 'mk', 'mn', 
    'mx', 'my', 'n_africa', 'nl', 'no', 'nz', 'pe', 'ph', 'pk', 'pl', 'pt', 'py', 'ro', 'rs', 'ru', 'sa', 'sa_en', 'sec', 'se', 
    'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'uz_ru', 'uz_uz', 'vn', 'za']
  
    const handleClickContainer = () => {
      setDropdownView(!isDropdownView)
    }
  
    const handleBlurContainer = () => {
      setTimeout(() => {
        setDropdownView(false)
      }, 200);
    }

    const dispatch = useDispatch();
    const ct = useSelector((state: any) => state.SiteCodeOption);
    const onClickEvent=(i:number)=>{
      dispatch(SiteCodeOption(Country[i]));
    };
    console.log(ct);
  
    return (
      <div className="container" onBlur={handleBlurContainer}>
        <label onClick={handleClickContainer}>
          <button className='filter-btn'>Site Code : {ct} {isDropdownView ? '▲' : '▼'}</button>
        </label>
        {isDropdownView && (<ul style={{listStyle:'none',position: 'absolute', 
        zIndex: 1, 
        maxHeight: '300px', overflowY: 'auto',
        margin: 0, padding: 0 }}>
          {
            Country.map((ct, i) => (
              <li className='limenu' onMouseDown={(e) => {
                e.preventDefault()
              }}  onClick={() => onClickEvent(i)}>{ct}</li>
            ))
          }
        </ul>)}
      </div>
    )
}

export default SelectSiteCode;