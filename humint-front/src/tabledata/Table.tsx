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
                <button onClick={() => handleFilter()}>테이블 보기</button>
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
                
                {page.map((row: any) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell: any, index: number) => {

                                return (
                                    <React.Fragment key={index}>
                                        {index === row.cells.length - 4 ? ( // 드롭다운 생성 조건
                                        <td {...cell.getCellProps()}>
                                            <select
                                                defaultValue={cell.render('Cell')}
                                                value={cell.render('Cell')} // 기존 데이터에 든 값
                                                onChange={(e) => handleDropdownChange(cell.render('Cell'))}
                                            >
                                                <>
                                                        <option value="N">N</option>
                                                        <option value="Y">Y</option>
                                                        <option>{cell.render('Cell')}</option>
                                                </>
                                                {/* {cell.render('Cell') == 'N' ? (
                                                    <>
                                                        <option value="Y">Y</option>
                                                        <option value="N">N</option>
                                                    </>
                                                ) : (
                                                    <>
                                                        <option value="N">N</option>
                                                        <option value="Y">Y</option>
                                                    </>
                                                )} */}
                                            </select>
                                        </td>
                                    ) :
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