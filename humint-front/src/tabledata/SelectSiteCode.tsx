import React, { useState } from 'react';
import { SiteCodeOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import './Table.css'

function SelectSiteCode() {
    const [isDropdownView, setDropdownView] = useState(false)
    const Country: string[] = ['ca_fr', 'ca', 'mx', 'br', 'latin', 'latin_en', 'co', 'ar', 'py', 'uy', 'cl', 'pe', 'sg', 'au', 'nz', 'id', 'th', 'mm', 'vn', 'my', 'ph', 'sec', 'jp', 'cn', 'hk', 'hk_en',
     'tw', 'uk', 'ie', 'de', 'at', 'ch', 'ch_fr', 'fr', 'it', 'gr', 'es', 'pt', 'be', 'be_fr', 'nl', 'se', 'dk', 'fi', 'no', 'pl', 'ro', 'bg', 'hu', 'cz', 'sk', 'ee', 'lv', 'lt', 'hr', 'rs', 'si', 'al', 
     'mk', 'ba', 'ua', 'ru', 'az', 'ge', 'kz_ru', 'kz_kz', 'mn', 'uz_ru', 'uz_uz', 'in', 'bd', 'ae', 'ae_ar', 'il', 'ps', 'sa', 'sa_en', 'tr', 'iran', 'levant', 'levant_ar', 'iq_ar', 'iq_ku',
      'lb', 'pk', 'eg', 'n_africa', 'africa_en', 'africa_fr', 'africa_pt', 'za', 'us']
  
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