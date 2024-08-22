import React from 'react';
import { Guide, datalist, Guideline } from '../../../interfaces/interfaceTable';

/**
 * ri, dataList, selectedResult 등을 포함하는 인터페이스입니다.
 */
interface checkResultProps {
  ri: number;
  dataList: datalist[];
  selectedResult: string[];
  handleRadioChange: (ri: number, value: string) => void;
}

/**
 * resultColumn.tsx - Check Result(결과값)를 포함하는 열 컴포넌트입니다.
 * @param param0 
 * @returns 
 */
export const CheckResultColumns: React.FC<checkResultProps> = ({ ri, dataList, selectedResult, handleRadioChange }) => {
  return (
    <td>
      {dataList[ri].check_result ? (
        <div className="check-wrap">
          <div className="check-box">
            <input
              type="radio"
              id={`${ri}-N`}
              value="N"
              name={`${ri}`}
              checked={selectedResult[ri] === "N"}
              onChange={(e) => handleRadioChange(ri, e.target.value)}
            />
            <label htmlFor={`${ri}-N`} className="checkbox"><span>N</span></label>
          </div>
          <div className="check-box">
            <input
              type="radio"
              id={`${ri}-Y`}
              value="Y"
              name={`${ri}`}
              checked={selectedResult[ri] === "Y"}
              onChange={(e) => handleRadioChange(ri, e.target.value)}
            />
            <label htmlFor={`${ri}-Y`} className="checkbox"><span>Y</span></label>
          </div>
        </div>
      ) : null}
    </td>
  );
};
