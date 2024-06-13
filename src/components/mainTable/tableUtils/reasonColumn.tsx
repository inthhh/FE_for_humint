import React from 'react';
import { Guide, datalist, Guideline } from '../interfaces';

interface checkReasonProps {
  ri: number;
  dataList: datalist[];
  guideObj: Guide[];
  ByRowKorean: {[key: number]: string[]};
  handleRemoveValue: (rowIndex: number, m:string) => void;
  handleDropdownChangeReason: (ri: number, selectedValue: number) => void;
}


export const CheckReasonColumns: React.FC<checkReasonProps> = ({ ri, dataList, guideObj, ByRowKorean, handleRemoveValue, handleDropdownChangeReason }) => {
  return (
    <td>
      {ByRowKorean[ri] && ByRowKorean[ri].map((m, i) => (
          <div className="guide-wrap">
              <span key={i} >{m}</span>
              <button onClick={()=>handleRemoveValue(ri, m)} className="btn-type btn-delete">삭제</button>
          </div>
      ))}
      {dataList[ri].check_reason ? ( 
          <>
          <select
              onChange={(e) => handleDropdownChangeReason(ri, Number(e.target.value))}
          >
              <option value={-1}>추가하기</option>
              <option value={1}>Pass</option>
              {guideObj.map((obj: any, key: number) => {
                  if (
                      (dataList[ri].title === "Headline Text" ||
                      dataList[ri].title === "Description Text" ||
                      dataList[ri].title === "Title" ||
                      dataList[ri].title === "Description")
                      && obj.reason_subject == "Text"
                  ) {
                      return (
                          <option value={obj.id} id={obj.id}>{obj.reason_value_kor}</option>
                      )
                  } else if (obj.id && dataList[ri].title === obj.reason_subject) {
                      return (
                          <option value={obj.id} id={obj.id}>{obj.reason_value_kor}</option>
                      );
                  }
                  return null;
              })}
              
          </select>
          </>)
          :(null)
      }
  </td>
  );
};