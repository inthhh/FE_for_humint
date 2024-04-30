import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import {Cookies} from 'react-cookie';
import {setCookie, getCookie} from '../cookieUtils';

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

  interface Guideline {
    eng: string
    kor: string
  }

export const Table = () => {
    
    const [dataList, setDataList] = useState<datalist[]>([]);
    
    const dispatch = useDispatch();
    const date = useSelector((state: any) => state.DateOption);
    const ct = useSelector((state: any) => state.SiteCodeOption);
    const result = useSelector((state: any) => state.ResultOption);
    const myname = useSelector((state: any) => state.myName);
    const [isSaved, setIsSaved] = useState(false);
    const [searchId, setSearchId] = useState<string>("");

    const guide_obj :any [] = [
        {
            subject: "Tile",
            contents: [{
                eng:"Guide: CO05 can allow only '5 tiles(1-2-2)' or 3 tiles(1-1-1) Grid style",
                kor: "[Tile 1] LSSSS, LLL  2개 타입만 허용"
            },{
                eng:"Guide: 5 tiles(1-2-2) grid system can use badge up to 2",
                kor:"[Tile 2] LSSSS : 2개까지 허용 / LLL : 1개까지 허용"
            },
            {
                eng:"Pass",
                kor:"Pass"
            }]
        },

        {
            subject : "Badge",
            contents : [{
                eng:"Guide: Badges can only contain the text New, Sale",
                kor:"[Badge 1] \"New\", \"Sale\" 두개의 뱃지만 허용"
            },
            {
                eng:"Guide: The badge's color guide was not followed.",
                kor:"[Badge 2] New-blue, Sale-red 조합만 가능"
            },
            {
                eng:"Pass",
                kor:"Pass"
            }]
        },

        {
            subject: "CTA",
            contents: [{
                eng:"Guide: Less than 25 characters",
                kor:"[CTA 1] CTA 문구는 25자를 넘어가면 안됨",
            },
            {
                eng:"Pass",
                kor:"Pass"
            }]
        },

        {
            subject: "Text",
            contents: [{ // text
                eng:"Guide: SKU cannot be included in text",
                kor:"SKU 사용불가",
            },{
                eng:"Guide: Check for the insertion of periods",
                kor:"문구 마지막에 온점 사용 불가"
            },{
                eng:"Guide: All words in titles cannot be written in uppercase, except 'Samsung'.",
                kor:"대문자 사용불가"
            },{
                eng:"Guide: Samsung' must be consistently written",
                kor:"\"Samsung\"으로만 표기"
            },{
                eng:"Guide: Unable to change font size",
                kor:"font-size 변경 불가"
            },{
                eng:"Guide: Unable to change font color",
                kor:"font-color 변경 불가"
            },{
                eng:"Guide: Unable to change fonts",
                kor:"font-family 변경 불가"
            },{
                eng:"Guide: Make sure there are no ellipsis (…) at the copy’s end.",
                kor:"ellipsis 불가"
            },{
                eng:"Guide: The text in the small tiles should be a maximum of two lines.",
                kor:"small Tile에서 최대 2줄까지만 허용"
            },{
                eng:"Guide: Small Tile's Description must be empty",
                kor:"small Tile에서 Description 사용 불가"
            },
            {
                eng:"Pass",
                kor:"Pass"
            }]
        },

        {
            subject: "BG Image",
            contents: [{ // image
                eng:"Guide: Background color must be transparent or #f4f4f4",
                kor:"Background Color Only #f4f4f4"
            },{
                eng:"Guide: The Samsung logo cannot be used in duplicate within the dotcom image except for the GNB logo.",
                kor:"Logo 사용불가"
            },{
                eng:"Guide: Tiles should show products only.",
                kor:"제품 이미지만 사용 가능"
            },
            {
                eng:"Guide: Use the new grid system to showcase multiple products in the big tile.",
                kor:"Big Tile 그리드 시스템에 따라 여러 제품 가능"
            },{
                eng:"Guide: Small tiles should show only one product. For multiple products (up to four), use the big tiles.",
                kor:"small Tile은 제품 1개만 가능"
            },{
                eng:"Guide: Image is not detected.",
                kor:"Image 없음"
            },
            {
                eng:"Pass",
                kor:"Pass"
            }]
        }
    ]
    

    const [changeResult, setResult] = useState<string>('N');
    // const [changeReason, setReason] = useState<string>('');
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef<HTMLDivElement>(null);

    const apiUrl = process.env.REACT_APP_API_URL;

    const columns = useMemo(() => COLUMNS, []);

    const [filterDate, setFilterDate] = useState('');
    const [filterSiteCode, setFilterSiteCode] = useState('');
    const [filterResult, setFilterResult] = useState('');
    const [name, setName] = useState<string|null>('');
    
    const [selected, setSelected] = useState("");

    
    
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
        usePagination,
        
    );

    const {pageIndex, pageSize} = state
    const handleSetPageSize=()=>{
        setPageSize(1000);
    }

    const getAPI = async() => {
        try {
            setName(getCookie('myName'));
            // console.log(apiUrl)
          const { data } = await axios.get(`${apiUrl}/api/v1/raw-data?date=${date}&site-code=${ct}&check-result=${result}`);
          setDataList(data.data);
          console.log(data.data);
          
        } catch (e) {
          console.error('API 호출 에러:', e);
        }
    }

    const searchAPI = async()=>{
        try{
            console.log(searchId);
            const {data} = await axios.get(`${apiUrl}/api/v1/raw-data/${searchId}`)
            setDataList(data.data);
            console.log(data.data);
        }catch (e) {
            console.error('API 검색 에러:', e);
          }
    }

      

    const editAPI = async(id: number, ri:number, combined:string, YN:string) => {
        try {
          const { data } = await axios.patch(`${apiUrl}/api/v1/raw-data/${id}`,{
            "checkResult": YN,
            "checkReason": combined
          });
          console.log("저장 완료", YN, combined);
          console.log(data);
          dataList[ri].check_result = YN;
          dataList[ri].check_reason = combined;
          setIsSaved(true); // API가 성공적으로 실행되면 상태를 true로 설정
          getAPI();
        } catch (e) {
          console.error('API 호출 에러:', e);
          alert("[저장 실패]\n기존 값으로 다시 저장하거나 바른 형식으로 저장하세요.");
        //   getAPI();
        //   dataList[ri].check_result = YN;
        // dataList[ri].check_reason = combined;
        }
      }

      const closeModal = () => {
        setIsSaved(false); // 모달이 닫힐 때 상태를 false로 설정
    };

    const handleDropdownChangeResult = (ri:number, value: string) => {
        // selectedResult[ri] = value;
        setResult(value);
    };


    const [selectedResult, setSelectedResult] = useState<string[]>([]);
    const [selectedValuesByRow, setSelectedValuesByRow] = useState<{[key: number]: string[]}>({});
    const [ByRowKorean, setByRowKorean] = useState<{[key: number]: string[]}>({});

    // Result 값 초기화
    // const resetSelectedResult=()=>{
    //     const updatedValues: string[] = [];
    //     dataList.map((r, index) => {
    //         const Values = r.check_result;
    //         updatedValues[index] = Values;
    //     });
    //     setSelectedResult(updatedValues);
    // }

    // 가이드 값 초기화
    const resetSelectedValuesByRow = () => {

        const updatedValues: {[key: number]: string[]} = {};

        dataList.forEach((item, index) => {
            const splitValues = item.check_reason.split('\n').filter(Boolean);
            updatedValues[index] = splitValues;
        });
        setSelectedValuesByRow(updatedValues);
        // selectedToKorean();
    };
    // console.log(ByRowKorean);

    // dataList 변경시마다 리셋
    useEffect(() => {
        // resetSelectedResult();
        resetSelectedValuesByRow();
        // selectedToKorean();
    }, [dataList]);
    // console.log("guide ",selectedValuesByRow);
        // console.log("result ",selectedResult);

    // 한글로 변환
    const selectedToKorean=()=>{
        const updatedValues: { [key: number]: string[] } = {};

        for (const [key, value] of Object.entries(selectedValuesByRow)) {
            const index = parseInt(key);
            updatedValues[index] = [];
    
            value.forEach((engValue) => {
                // guide_obj에서 engValue와 일치하는 항목을 찾아서 kor 값을 가져옴
                const guideItem = guide_obj.find((obj) => obj.contents.some((content:any) => content.eng === engValue));
                if (guideItem) {
                    const korValue = guideItem.contents.find((content:any) => content.eng === engValue)?.kor;
                    // console.log(korValue)
                    if (korValue) {
                        updatedValues[index].push(korValue);
                    }
                }
            });
        }
        setByRowKorean(updatedValues);
    };
    // console.log(ByRowKorean)
    // 선택한 값 추가 함수

    const handleDropdownChangeReason = (rowIndex:number, selectedValue: string) => {
        setSelectedValuesByRow(prevState => {
            const updatedRow = [...(prevState[rowIndex] || []), selectedValue];
            return {...prevState, [rowIndex]: updatedRow};
        });
    }

    // 선택한 값 제거 함수
    const handleRemoveValue = (rowIndex: number, valueToRemove: string) => {
        setSelectedValuesByRow({
            ...selectedValuesByRow,
            [rowIndex]: selectedValuesByRow[rowIndex].filter((value: any) => value !== valueToRemove)
        });
        console.log("삭제됨");
    };
    // console.log("selected ", selectedValuesByRow);
    // useEffect(() => {
    //     selectedToKorean();
    //     console.log("한글변환완료")
    // }, [selectedValuesByRow]);

    const combineValuesToString = (id:number, rowIndex:number, YN:string) => { // guide 리스트를 string으로 결합
        const combined = selectedValuesByRow[rowIndex] ? selectedValuesByRow[rowIndex].join('\n') : '';
        editAPI(id, rowIndex, combined, YN);
        // getAPI();
        // dataList[rowIndex].check_result = YN;
        // dataList[rowIndex].check_reason = combined;
    };

    const handleImgclick = (src:string)=>{
        window.open(src);
    
    }

    const handleFilter=()=>{
        handleSetPageSize();
        getAPI();
    }

    // 저장 버튼 클릭 이벤트
    const handleButtonClick = (ri:number, id:number, YN:string)=>{
        if(YN==null) {
            YN = dataList[ri].check_result;
        }
        console.log("guide ",selectedValuesByRow);
        console.log("result ",YN);
        console.log(date, ct, result);
        combineValuesToString(id, ri, YN);
    }

    return (
        <div>
            <Provider store={store}>
            <div style={{display: 'flex'}}>
                <SelectDate/>
                <SelectSiteCode/>
                <SelectResult/>
                <button className='filter-btn' style={{margin:"20px 0 0 20px", backgroundColor:"yellow"}}onClick={() => handleFilter()}>테이블 보기</button>
                <div style={{display: 'flex', height:"60px"}}>
                    {/* 검색 입력창 */}
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="ID로 검색하기"
                        style={{margin:"20px 0 0 20px"}}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchAPI();
                            }
                        }}
                    />
                    
                    <button onClick={()=>searchAPI()} style={{width:"100px", margin:"20px 0 0 10px"}}>검색</button>
                    
                </div>
                
                <p style={{margin:"30px 0 0 20px"}}>✅ {getCookie('myName')} 님 환영합니다.</p>
            </div>
            
            </Provider>
        <div className="table">
            <table {...getTableProps()}>

                {/* table head */}
                <thead>
                    {headerGroups.map((headerGroup:any) => (                   
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:any, i:number) => (
                                <th {...column.getHeaderProps()} style={{width:"400px"}}>
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
                                        {/* {index === row.cells.length - 5 ? (
                                        <td {...cell.getCellProps()}>
                                            <div style={{width:"300px"}}>
                                            {cell.render('Cell')}
                                            </div>
                                        </td>
                                    ) : */}
                                        {index === row.cells.length - 4 ? ( // Check 드롭다운 생성
                                        <td {...cell.getCellProps()}>
                                            
                                            {dataList[ri].check_result ? ( 
                                            <select
                                                key={dataList[ri].check_result} // 기존 데이터에 든 값
                                                defaultValue={dataList[ri].check_result}
                                                onChange={(e) => handleDropdownChangeResult(ri, e.target.value)}
                                            >
                                                    {/* <option>{selectedResult[ri]}</option> */}
                                                    <option>{dataList[ri].check_result}</option>
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
                                    ) : index === row.cells.length - 3 ? ( // 가이드 드롭다운 생성
                                    <td {...cell.getCellProps()}>
                                        
                                        {selectedValuesByRow[ri] && selectedValuesByRow[ri].map((m, i) => (
                                            <div style={{display:"flex"}}>
                                                <p key={i} style={{width:"400px"}}>{m}</p>
                                                <button onClick={()=>handleRemoveValue(ri, m)} style={{marginLeft:"2px",width:"50px", height:"30px"}}>삭제</button>
                                            </div>
                                        ))}

                                        {dataList[ri].check_reason ? ( 
                                            <>
                                            <select
                                                key={cell.render('Cell')}
                                                defaultValue={cell.render('Cell')}
                                                onChange={(e) => handleDropdownChangeReason(ri, e.target.value)}
                                            >
                                                <option>{cell.render('Cell')}</option>
                                                {/* <option>추가하기</option> */}

                                                {guide_obj.map((obj: any, key: number) => {
                                                    if (
                                                        (dataList[ri].title === "Headline Text" ||
                                                        dataList[ri].title === "Description Text" ||
                                                        dataList[ri].title === "Title" ||
                                                        dataList[ri].title === "Description") &&
                                                        obj.subject === "Text"
                                                    ) {
                                                        return obj.contents && obj.contents.map((guide_msg: any, key: number) => (
                                                            <option value={guide_msg.eng} key={key} id={obj.subject}>{guide_msg.kor}</option>
                                                        ));
                                                    } else if (dataList[ri].title === obj.subject && obj.contents) {
                                                        return obj.contents.map((guide_msg: any, key: number) => (
                                                            <option value={guide_msg.eng} key={key} id={obj.subject}>{guide_msg.kor}</option>
                                                        ));
                                                    }
                                                    return null;
                                                })}
                                                
                                            </select>
                                            </>)
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
                                                <button onClick={() => handleButtonClick(ri, dataList[ri].id, changeResult)}>저장</button>
                                            </td>
                                            {
                                                isSaved &&
                                                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                                                  if (e.target === modalBackground.current) {
                                                    closeModal();
                                                  }
                                                }}>
                                                  <div className={'modal-content'}>
                                                  <div>
                                                        <p>저장되었습니다.</p>
                                                        <button className={'modal-close-btn'} onClick={closeModal}>
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