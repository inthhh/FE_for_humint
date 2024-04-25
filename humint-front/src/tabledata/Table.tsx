import React, { useEffect, useMemo, useRef, useState } from 'react';
import { COLUMNS } from './Columns'
// import MOCK_DATA from './mockdata.json'
import { usePagination, useTable } from 'react-table'
import './Table.css'
import SelectDate from './SelectDate';
import SelectResult from './SelectResult';
import SelectSiteCode from './SelectSiteCode';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { DateOption, SiteCodeOption, ResultOption } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

interface datalist {
    id: number;
    key: string;
    date: string;
    rhq: string;
    subsidiary: string;
    site_code: string;
    page_type: string;
    category: string;
    location: string;
    area: string;
    title: string;
    description: string;
    contents: string;
    check_result: string;
    check_reason: string;
    created_at: string;
    updated_at: string;
  }

  

export const Table = () => {
    
    const [dataList, setDataList] = useState<datalist[]>([]);
    const dispatch = useDispatch();
    const date = useSelector((state: any) => state.DateOption);
    const ct = useSelector((state: any) => state.SiteCodeOption);
    const result = useSelector((state: any) => state.ResultOption);
    const GuideMsg: string[] = ["Guide: Unable to change font size",
        "Guide: Unable to change font color",
        "Guide: Unable to change fonts",
        "Guide: 'Samsung' must be consistently written",
        "Guide: Check for the insertion of periods",
        "Guide: All words in titles cannot be written in uppercase, except 'Samsung'.",
        "Guide: SKU cannot be included in text",
        "Guide: Less than 25 characters",
        "Guide: The badge's color guide was not followed.",
        "Guide: Only can detect logo in image format with png, jpg and jpeg.",
        "Guide: The Samsung logo cannot be used in duplicate within the dotcom image except for the GNB logo.",
        "Guide: Background color must be transparent or #f4f4f4",
        "Guide: Image is not detected.","Pass"];
    const [changeResult, setResult] = useState<string>('');
    const [changeReason, setReason] = useState<string>('');

    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement>(null);
  
      const getAPI = async() => {
        try {
          const { data } = await axios.get(`http://121.252.182.166:3000/api/v1/raw-data?date=${date}&site-code=${ct}&check-result=${result}`);
          setDataList(data.data);
          console.log(data.data);
          
        } catch (e) {
          console.error('API 호출 에러:', e);
        }
      }
      
      const editAPI = async(id: number) => {
        try {
          const { data } = await axios.patch(`http://121.252.182.166:3000/api/v1/raw-data/${id}`,{
            "checkResult": changeResult,
            "checkReason": changeReason
          });
          console.log("저장 완료", changeResult, changeReason);
          console.log(data);
        } catch (e) {
          console.error('API 호출 에러:', e);
        }
      }


      const handleFilter=()=>{
        handleSetPageSize();
        console.log(date, ct, result);
        getAPI();
        
      }

      const handleButtonClick = (id:number)=>{
        editAPI(id);
        getAPI();
        setModalOpen(true);
      }
    
    const columns = useMemo(() => COLUMNS, []);

    const [filterDate, setFilterDate] = useState('');
    const [filterSiteCode, setFilterSiteCode] = useState('');
    const [filterResult, setFilterResult] = useState('');

    
    const { 
        getTableProps, 
        getTableBodyProps, 
        headerGroups, 
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
        state,
        prepareRow,
    } = useTable({
            // @ts-ignore
            columns,
            data: dataList,
        },
        usePagination
    );

    const {pageIndex, pageSize} = state
    const handleSetPageSize=()=>{
        setPageSize(1000);
    }

    const handleDropdownChangeResult = (value: string) => {
        setResult(value)
        console.log(value,"로 변경됨");
        console.log("현재 상태 Result", changeResult);

    };

    const handleDropdownChangeReason = (value: string) => {
        setReason(value)
        console.log(value,"로 변경됨");
        console.log("현재 상태 Reason", changeReason);
    };

    const handleImgclick = (src:string)=>{
        window.open(src);
    }

    const [selected, setSelected] = useState("");


    return (
        <div>
            <Provider store={store}>
            <div style={{display: 'flex'}}>
                <SelectDate/>
                <SelectSiteCode/>
                <SelectResult/>
                <button className='filter-btn' style={{margin:"10px", backgroundColor:"yellow"}}onClick={() => handleFilter()}>테이블 보기</button>
            </div>
            </Provider>
        <div className="table">
            <table {...getTableProps()}>

                {/* table head */}
                <thead>
                    {headerGroups.map((headerGroup:any) => (                   
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:any, i:number) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {dataList && dataList.length > 0 ? (
                <tbody {...getTableBodyProps()}>
                
                {/* table body */}
                {page.map((row: any, ri:number) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell: any, index: number) => {

                                return (
                                    <React.Fragment key={index}>
                                        {index === row.cells.length - 4 ? ( // 드롭다운 생성 조건
                                        <td {...cell.getCellProps()}>
                                            
                                            {dataList[ri].check_result ? ( 
                                            <select
                                                key={cell.render('Cell')} // 기존 데이터에 든 값
                                                defaultValue={cell.render('Cell')}
                                                onChange={(e) => handleDropdownChangeResult(e.target.value)}
                                            >
                                                    <option>{cell.render('Cell')}</option>
                                                    {/* <option value="Y">Y</option>
                                                    <option value="N">N</option> */}
                                                {dataList[ri].check_result == "N" ? (
                                                    <>
                                                        <option value="Y">Y</option>
                                                    </>
                                                ) : dataList[ri].check_result == "Y" ? (
                                                    <>
                                                        <option value="N">N</option>
                                                    </>
                                                ) : <>
                                                <option value="N">N</option>
                                                <option value="Y">Y</option>
                                                </>}
                                            </select>)
                                            : (null)
                                        }
                                        </td>
                                    ) : index === row.cells.length - 3 ? ( // 드롭다운 생성 조건
                                    <td {...cell.getCellProps()}>
                                        
                                        {dataList[ri].check_reason ? ( 
                                        <select
                                            key={cell.render('Cell')} // 기존 데이터에 든 값
                                            defaultValue={cell.render('Cell')} // 기존 데이터에 든 값
                                            onChange={(e) => handleDropdownChangeReason(e.target.value)}
                                        >
                                                <option>{cell.render('Cell')}</option>
                                                {GuideMsg.map((msg, i) => (
                                                    <option key={i}>{msg}</option>
                                                    // <option key={i}>{i+1}. {msg}</option>
                                                ))}
                                        </select>)
                                        :(null)
                                    }
                                    </td>) : index === row.cells.length - 2 ? ( // 이미지
                                    <td {...cell.getCellProps()}>
                                        
                                        {/* contents가 https로 시작한다면 이미지 출력, 너비 고정 */}
                                        
                                        {dataList[ri].contents && dataList[ri].contents.startsWith("https:") ? (
                                            <img src={dataList[ri].contents} alt="image" style={{ width: '300px', cursor:"pointer" }} 
                                            onClick={()=>handleImgclick(dataList[ri].contents)} />
                                        ) : (
                                            null
                                        )}
                                    </td>) :
                                        index === row.cells.length - 1 ? ( // 마지막 열에 저장버튼
                                            <>
                                            <td>
                                                <button onClick={() => handleButtonClick(dataList[ri].id)}>저장</button>
                                            </td>
                                            {
                                                modalOpen &&
                                                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                                                  if (e.target === modalBackground.current) {
                                                    setModalOpen(false);
                                                  }
                                                }}>
                                                  <div className={'modal-content'}>
                                                    <div>
                                                    <p>저장되었습니다.</p>
                                                    <button className={'modal-close-btn'} onClick={() => setModalOpen(false)}>
                                                      닫기
                                                    </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                            </>
                                        ):(<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                                    </React.Fragment>
                                    
                                );
                        })}
                        </tr>
                    );
                })}
            </tbody>
            ) : (
                <p>테이블 값이 없습니다</p>)}
            </table>

            </div>
        </div>
    );
}

export default Table;