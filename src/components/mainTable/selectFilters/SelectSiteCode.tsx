import React, { useState } from 'react';
import { SiteCodeOption } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import '../Table.css'

/**
 * SelectSiteCode.tsx - 국가 코드를 필터링하는 드롭다운 컴포넌트입니다.
 * @returns 
 */
function SelectSiteCode() {
  const [isDropdownView, setDropdownView] = useState(false)
  const Country: string[] = ['ae', 'ae_ar', 'africa_en', 'africa_fr', 'africa_pt', 'al', 'ar', 'at', 'au', 'az',
    'ba', 'bd', 'be', 'be_fr', 'bg', 'br', 'ca', 'ca_fr', 'ch', 'ch_fr',
    'cl', 'cn', 'co', 'cz', 'de', 'dk', 'ee', 'eg', 'es', 'fi',
    'fr', 'ge', 'gr', 'hk', 'hk_en', 'hr', 'hu', 'id', 'ie', 'il',
    'in', 'iq_ar', 'iq_ku', 'iran', 'it', 'jp', 'kz_kz', 'kz_ru', 'latin', 'latin_en',
    'lb', 'levant', 'levant_ar', 'lt', 'lv', 'mk', 'mm', 'mn', 'mx', 'my',
    'n_africa', 'nl', 'no', 'nz', 'pe', 'ph', 'pk', 'pl', 'ps', 'pt',
    'py', 'ro', 'rs', 'ru', 'sa', 'sa_en', 'se', 'sec', 'sg', 'si', 'sk',
    'th', 'tr', 'tw', 'ua', 'uk', 'us', 'uy', 'uz_ru', 'uz_uz', 'vn',
    'za'
  ]
  const dispatch = useDispatch();
  const ct = useSelector((state: any) => state.SiteCodeOption);

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
  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false)
    }, 200);
  }

  /**
   * @function
   * 드롭다운 요소 클릭 이벤트 함수입니다.
   * @param i 
   */
  const onClickEvent = (i: number) => {
    setDropdownView(false);
    dispatch(SiteCodeOption(Country[i]));
  };

  return (
    <div className="container" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button className='filter-btn'>Site Code : {ct} {isDropdownView ? '▲' : '▼'}</button>
      </label>
      {isDropdownView && (<ul style={{
        listStyle: 'none', position: 'absolute',
        zIndex: 9,
        maxHeight: '500px', overflowY: 'auto',
        margin: 0, padding: 0
      }}>
        {
          Country.map((ct, i) => (
            <li className='limenu' onMouseDown={(e) => {
              e.preventDefault()
            }} onClick={() => onClickEvent(i)}>{ct}</li>
          ))
        }
      </ul>)}
    </div>
  )
}

export default SelectSiteCode;