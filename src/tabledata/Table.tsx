import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { COLUMNS } from './Columns';
import { usePagination, useTable } from 'react-table';
import './Table.css';
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
import { Guide, datalist, Guideline } from './interfaces';
import './base.css'


export const Table = () => {

    // getAPI에서 불러오는 데이터 목록 전체를 저장
    const [dataList, setDataList] = useState<datalist[]>([]);
    // 데이터 백업(수정 후 저장 실패 시 원상복구 용도)
    const [dataBackup, setDataBackup] = useState<datalist[]>([]);
    // Table 열 제목(./Columns 파일 참조)
    const columns = useMemo(() => COLUMNS, []);

    // Table 기본 요소들
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
    
    // redux data
    const dispatch = useDispatch();
    const date = useSelector((state: any) => state.DateOption);
    const ct = useSelector((state: any) => state.SiteCodeOption);
    const result = useSelector((state: any) => state.ResultOption);
    const myname = useSelector((state: any) => state.myName);
    
    // 검색 ID
    const [searchId, setSearchId] = useState<string>("");
    // 가이드 목록
    const [guideObj, setGuideObj] = useState<Guide[]>([]);
    // 저장 시 모달(true일 때 모달을 띄움)
    const [isSaved, setIsSaved] = useState(false);
    // 모달 뒤의 배경(배경 클릭 시 모달창이 꺼짐)
    const modalBackground = useRef<HTMLDivElement>(null);
    // API 도메인
    // const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrl = "http://121.252.183.23:8080"
    // 유저 네임
    const [name, setName] = useState<string|null>('');

    // check_result 저장
    const [selectedResult, setSelectedResult] = useState<string[]>([]);
    // check_reason 저장
    const [selectedValuesByRow, setSelectedValuesByRow] = useState<{[key: number]: string[]}>({});
    // check_reason 한글로 저장
    const [ByRowKorean, setByRowKorean] = useState<{[key: number]: string[]}>({});
    // 페이지 인덱싱
    const {pageIndex, pageSize} = state
    
    // 한 페이지의 테이블 길이
    const handleSetPageSize=()=>{
        setPageSize(1000);
    }

    // 각 행의 Title에 맞는 가이드 목록을 받아오는 API
    const getGuideAPI = async () => {
        try {
            const { data } = await axios.get(`${apiUrl}/api/v1/raw-data-category/check-reason`);
            setGuideObj(data.data);
            // console.log("get guide : ", data.data);
        } catch (e) {
            console.error('guide API 호출 에러:', e);
        }
    }
    
    useEffect(()=>{
        getGuideAPI();
    },[])

    // Table Data 전체를 받아오는 API
    const getAPI = async() => {
        try {
            setName(getCookie('myName'));
          const { data } = await axios.get(`${apiUrl}/api/v1/raw-data?date=${date}&site-code=${ct}&check-result=${result}`);
          setDataList([...data.data]);
          console.log(data.data);
          setDataBackup([...data.data]);
        } catch (e) {
          console.error('API 호출 에러:', e);
        }
    }

    // ID 검색 결과를 받아오는 API
    const searchAPI = async()=>{
        try{
            console.log(searchId);
            const {data} = await axios.get(`${apiUrl}/api/v1/raw-data/${searchId}`)
            setDataList([...data.data]);
            console.log(data.data);
            setDataBackup([...data.data]);
        }catch (e) {
            console.error('API 검색 에러:', e);
          }
    }

    // Check 결과&가이드 값 수정 후 저장하는 API
    const editAPI = async(id: number, ri:number, combined:string) => {
        try {
            console.log("edit go ", combined);
            const YN = selectedResult[ri];
            
            // 예외처리. 조건에 맞지 않는 저장을 시도할 때
            if(!checkSync(YN, combined)){
                throw new Error("Result와 Guide 싱크가 맞지 않습니다.");
            }

            const { data } = await axios.patch(`${apiUrl}/api/v1/raw-data/${id}`,{
              "checkResult": YN,
              "checkReason": combined,
              "user": myname
            });
            console.log("저장 완료", YN, combined);
            console.log(data);

            setDataList(prevDataList => {
                const newDataList = [...prevDataList];
                newDataList[ri].check_result = YN;
                newDataList[ri].check_reason = combined;
                return newDataList;
            });
            setDataBackup(prevDataBackup => {
                const newDataBackup = [...prevDataBackup];
                newDataBackup[ri].check_result = YN;
                newDataBackup[ri].check_reason = combined;
                return newDataBackup;
            });
            setIsSaved(true);

        } catch (e) {
             console.error('API 호출 에러:', e);
            alert("[저장 실패]\n바른 형식으로 저장해주세요.");
            
            setSelectedResult(prevDataList => {
                const newDataList = [...prevDataList];
                newDataList[ri] = dataBackup[ri].check_result;
                return newDataList;
            });
            setDataList(prevDataList => {
                const newDataList = [...prevDataList];
                newDataList[ri].check_result = dataBackup[ri]?.check_result;
                newDataList[ri].check_reason = dataBackup[ri]?.check_reason;
                return newDataList;
            });
            
            console.log("기존 result ", dataBackup[ri].check_result);
            console.log("기존 reason ", dataBackup[ri]?.check_reason);
        }
    }

    // Check 결과&가이드 저장 예외처리
    const checkSync=(YN:string, combined:string)=>{
        if(YN==='N' && combined.startsWith('Pass')) return false;
        if(YN==='Y' && combined.startsWith('Guide')) return false;
        if(YN==='Y' && !combined.endsWith('Pass')) return false;
        if(YN==='N' && combined.includes('Pass')) return false;
        if(combined == null) return false;
        if(YN == null) return false;
        return true;
    }

    // 모달이 닫힐 때 isSaved 상태를 false로 설정
    const closeModal = () => {
        setIsSaved(false);
    };

    // Check 값을 저장해둔 배열을 초기화, 갱신
    const resetSelectedResult = () => {
        const updatedValues: string[] = [];
        dataList.forEach((item, index) => {
            updatedValues[index] = dataList[index].check_result;
        });
        setSelectedResult(updatedValues);
    };

    // 가이드 값을 저장해둔 배열을 초기화, 갱신
    const resetSelectedValuesByRow = () => {

        const updatedValues: {[key: number]: string[]} = {};
        const koreans: { [key: number]: string[] } = {};

        dataList.forEach((item, index) => {
            const splitValues = item.check_reason.split('\n').filter(Boolean);
            updatedValues[index] = splitValues;
            const uniqueKoreans: Set<string> = new Set();
            splitValues.forEach((splitValue) => {
                guideObj.forEach((obj) => {
                    if (obj.reason_value_eng === splitValue) {
                        uniqueKoreans.add(obj.reason_value_kor);
                    } else if(splitValue.includes('#f4f4f4')){
                        uniqueKoreans.add(guideObj[20].reason_value_kor);
                    }
                });
            });
    
            // Set을 다시 배열로 변환하여 koreans에 할당
            koreans[index] = Array.from(uniqueKoreans);
        });

        // console.log("reset guide : ",koreans);
        setByRowKorean(koreans);
    };

    // dataList(전체 데이터)가 변경될때마다 결과 및 가이드 배열을 갱신
    useEffect(() => {
        resetSelectedResult();
        resetSelectedValuesByRow();
    }, [dataList]);

    // 가이드 드롭다운에서 선택한 값을 가이드 배열에 추가
    const handleDropdownChangeReason = (ri:number, selectedValue: number) => {
        console.log("select what - ", selectedValue)
        if(selectedValue<=0) return;
        // const korValue = guideObj[selectedValue-1].reason_value_kor;
        const selectedItem = guideObj.find(item => item.id === selectedValue);

        let korValue = "";
        if (selectedItem) {
            korValue = selectedItem.reason_value_kor;
        }

        setByRowKorean(prevState => {
            const updatedRow = [...(prevState[ri] || [])];
            if (!updatedRow.includes(korValue)) {
                updatedRow.push(korValue);
            }
            return {...prevState, [ri]: updatedRow};
        });
    }

    // 가이드 목록에서 선택한 값을 삭제, 가이드 배열에서 제거
    const handleRemoveValue = (rowIndex: number, m:string) => {
        setByRowKorean({
            ...ByRowKorean,
            [rowIndex]: ByRowKorean[rowIndex].filter((value: any) => value !== m)
        });
        // console.log("삭제됨", ByRowKorean);
    };

    // 이미지 클릭 시 링크 열기
    const handleImgclick = (src:string)=>{
        window.open(src);
    }

    // 필터 선택 후 '테이블 보기' 버튼 클릭 시 테이블을 보여주는 이벤트
    const handleFilter=()=>{
        handleSetPageSize();
        getAPI();
    }

    // Result 라디오 버튼 선택 이벤트, dataList 상태를 업데이트하여 선택된 값으로 변경
    const handleRadioChange = (ri:number, value: string) => {
        setSelectedResult(prevDataList => {
            const newDataList = [...prevDataList];
            newDataList[ri] = value;
            return newDataList;
        });
        console.log(value);
        // console.log("datalist ri result : ", dataList[ri].check_result);
        // console.log("백업 ri result : ", dataBackup[ri].check_result);

    };

    // 가이드 목록을 문자열로 통합
    const combineValuesToString = (id: number, rowIndex: number) => {
        let combined: string[] = [];
        if (ByRowKorean[rowIndex]) {
            combined = ByRowKorean[rowIndex].map(koreanValueToEng);
        }
        // 수정된 값을 저장하는 API로 이동
        editAPI(id, rowIndex, Array.isArray(combined) ? combined.join('\n') : ''); 
    };
    
    // 한국어 값을 영어로 변환하는 함수
    const koreanValueToEng = (koreanValue: string) => {
        // Guide: Background color must be transparent or #f4f4f4 - dynamic 값 예외처리
        if(koreanValue.includes('#f4f4f4')){
            return guideObj[20].reason_value_eng;
        }
        const guideItem = guideObj.find((obj) => obj.reason_value_kor === koreanValue);
        console.log("영어변환값 : ",guideItem?.reason_value_eng);
        // 영어 변환값에 해당하는 항목이 있으면 영어 값을 반환, 없으면 그대로 반환
        return guideItem ? guideItem.reason_value_eng : koreanValue;
    };

    // 저장 버튼 클릭 이벤트
    const handleButtonClick = (ri:number, id:number)=>{
        // console.log("check : ",selectedResult ," / guide : ",selectedValuesByRow);
        // 가이드 목록을 문자열로 통합하는 함수로 이동
        combineValuesToString(id, ri);
    }

    return (
        <div>
            <Provider store={store}>
            <header className="header-wrap">
                {/* 필터 선택 및 '테이블 보기' 버튼 */}
                <SelectDate/>
                <SelectSiteCode/>
                <SelectResult/>
                <button className='btn-type btn-filter' onClick={() => handleFilter()}>테이블 보기</button>
                {/* 검색 입력창 및 '검색' 버튼 */}
                <div className="search-wrap">
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="ID로 검색하기"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchAPI();
                            }
                        }}
                    />
                    <button onClick={()=>searchAPI()}  className='btn-type btn-search'>검색</button>
                </div>
                
                <p className="text-type">☑️ {getCookie('myName')} 님 환영합니다.</p>
            </header>
            
            </Provider>
            <div className="table-wrap">
            <table {...getTableProps()} >

                {/* table head */}
                <colgroup>
                {/* 각 열의 스타일 설정 */}
                        <col />
                        <col />
                        <col />
                        <col style={{width:'50px'}}/>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col style={{width:'200px'}}/>
                        <col style={{width:'100px'}}/>
                        <col style={{width:'200px'}}/>
                        <col style={{width:'350px'}}/>
                        <col />
                </colgroup>
                <thead>
                    {headerGroups.map((headerGroup:any) => (                   
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:any, i:number) => (
                                <th {...column.getHeaderProps()} >
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
                                        {index === row.cells.length - 4 ? ( // Check 열에 라디오 버튼 생성
                                        <td {...cell.getCellProps()}>
                                            
                                            {dataList[ri].check_result ? ( 
                                                <>
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
                                            </>
                                        )
                                            : (null)
                                        }
                                        </td>
                                    ) : index === row.cells.length - 3 ? ( // Guide 열에 드롭다운 생성
                                    <td {...cell.getCellProps()}>
                                        {ByRowKorean[ri] && ByRowKorean[ri].map((m, i) => (
                                            <div className="guide-wrap">
                                                <span key={i} >{m}</span>
                                                <button onClick={()=>handleRemoveValue(ri, m)} className="btn-type btn-delete">삭제</button>
                                            </div>
                                        ))}

                                        {dataList[ri].check_reason ? ( 
                                            <>
                                            <select
                                                key={cell.render('Cell')}
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
                                    </td>) : index === row.cells.length - 2 ? ( // Image 열에 이미지를 보여줌
                                    <td {...cell.getCellProps()} className="img-wrap">
                                        {/* contents가 https로 시작한다면 이미지 출력, 너비 고정 */}
                                        {dataList[ri].contents && dataList[ri].contents.startsWith("https:") ? (
                                            <img src={dataList[ri].contents} alt="image" style={{ width: '300px', cursor:"pointer" }} 
                                            onClick={()=>handleImgclick(dataList[ri].contents)} />
                                        ) : (
                                            null
                                        )}
                                    </td>) :
                                        index === row.cells.length - 1 ? ( // 마지막 열에 저장 버튼을 보여줌
                                            <>
                                            <td>
                                                <button onClick={() => handleButtonClick(ri, dataList[ri].id)} className="btn-type btn-save">저장</button>
                                                {
                                                isSaved &&
                                                <div className={'modal-container'} ref={modalBackground} onClick={e => {
                                                  if (e.target === modalBackground.current) {
                                                    closeModal();
                                                  }
                                                }}>
                                                  <div className={'modal-content'}>
                                                  <div className={'modal-sub'}>
                                                        <p>저장되었습니다.</p>
                                                        <button className={'modal-close-btn'} onClick={closeModal}>
                                                            닫기
                                                        </button>
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                            </td>
                                            
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
                <tbody>
                    <tr>
                        <td colSpan={13}><div className="no-data">테이블 값이 없습니다</div></td>
                    </tr>
                </tbody>
                )}
            </table>

            </div>
        </div>
    );
}

export default Table;