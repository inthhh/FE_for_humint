import React, { useEffect, useMemo, useState } from 'react';
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
    date: string;
    rhq: string;
    subsidiary: string;
    site_code: string;
    page_type: string;
    category: string;
    location: string;
    title: string;
    Description: string;
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
        "Guide: Image is not detected."]
    
  
      const getAPI = async() => {
        try {
          const { data } = await axios.get(`http://121.252.182.166:3000/api/v1/raw-data?date=${date}&site-code=${ct}&check-result=${result}`);
          setDataList(data.data);
          console.log(data.data);
          
        } catch (e) {
          console.error('API 호출 에러:', e);
        }
      }
      

      const handleFilter=()=>{
        handleSetPageSize();
        console.log(date, ct, result);
        getAPI();
        
      }

    //   useEffect(()=>{
    //     getAPI();
    //   },[])
    
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

    // const { pageIndex, pageSize } = state

    const handleDropdownChange = (value: string) => {
        const selectedValue = value;
        console.log(selectedValue)
    };

    const handleImgclick = (src:string)=>{
        window.open(src);
    }

    const [selected, setSelected] = useState("");

    const handleButtonClick = (rowdata:any)=>{
        console.log(rowdata, "save");
    }


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
                <thead>
                    {headerGroups.map((headerGroup:any) => (                   
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>

                {dataList && dataList.length > 0 ? (
                <tbody {...getTableBodyProps()}>
                
                {page.map((row: any, ri:number) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell: any, index: number) => {

                                return (
                                    <React.Fragment key={index}>
                                        {index === row.cells.length - 4 ? ( // 드롭다운 생성 조건
                                        <td {...cell.getCellProps()}>
                                            
                                            {cell.render('Cell')!=null ? ( 
                                            <select
                                                key={cell.render('Cell')} // 기존 데이터에 든 값
                                                defaultValue={cell.render('Cell')} // 기존 데이터에 든 값
                                                onChange={(e) => handleDropdownChange(cell.render('Cell'))}
                                            >
                                                    <option>{cell.render('Cell')}</option>
                                                    <option value="Y">Y</option>
                                                    <option value="N">N</option>
                                                {/* {cell.render('Cell') == "N" ? (
                                                    <>
                                                        <option value="Y">Y</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="N">N</option>
                                                    </>
                                                )} */}
                                            </select>)
                                            :(<p>null</p>)
                                        }
                                        </td>
                                    ) : index === row.cells.length - 3 ? ( // 드롭다운 생성 조건
                                    <td {...cell.getCellProps()}>
                                        
                                        {cell.render('Cell')!=null ? ( 
                                        <select
                                            key={cell.render('Cell')} // 기존 데이터에 든 값
                                            defaultValue={cell.render('Cell')} // 기존 데이터에 든 값
                                            onChange={(e) => handleDropdownChange(cell.render('Cell'))}
                                        >
                                                <option>{cell.render('Cell')}</option>
                                                {GuideMsg.map((msg, i) => (
                                                    <option key={i}>{i+1}. {msg}</option>
                                                ))}
                                        </select>)
                                        :(<p>null</p>)
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
                                            <td>
                                                <button onClick={() => handleButtonClick(row.original)}>저장</button>
                                            </td>
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