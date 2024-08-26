import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { COLUMNS } from './Columns';
import { usePagination, useTable } from 'react-table';
import './Table.css';
import { Filters } from './CommonFilter';
import ScrollToTopBtn from './ScrollToTopBtn';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { useSelector } from "react-redux";
import { getCookie } from '../../utils/cookieUtils';
import { Guide, datalist } from '../../interfaces/interfaceTable';
import './base.css'

import { getAPI_, searchAPI_, editAPI_, getGuideAPI_ } from './tableUtils/tableApi';
import saveEdit from './tableUtils/saveEditData';
import { CheckReasonColumns } from './tableUtils/reasonColumn';
import { CheckResultColumns } from './tableUtils/resultColumn';
import { ColGroup } from './tableUtils/colGroup';
import ImgIframe from './tableUtils/imgIframe';
import { RootState } from '../../interfaces/interfaceRedux';

/**
 * Table.tsx - 모든 데이터를 조회하거나 수정할 수 있는 테이블 컴포넌트입니다.
 * @returns Table
 */
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
        // nextPage,
        // previousPage,
        // canNextPage,
        // canPreviousPage,
        // pageOptions,
        // gotoPage,
        // pageCount,
        setPageSize,
        // state,
        prepareRow,
    } = useTable({
        // @ts-ignore
        columns,
        data: dataList,
    },
        usePagination,

    );


    // redux data
    // const dispatch = useDispatch();
    // const myname = useSelector((state: RootState) => state.user.myName);
    const date = useSelector((state: RootState) => state.product.DateOption);
    const ct = useSelector((state: RootState) => state.product.SiteCodeOption);
    const result = useSelector((state: RootState) => state.product.ResultOption);
    const pagetype = useSelector((state: RootState) => state.product.PageTypeOption);
    const component = useSelector((state:RootState) => state.product.ComponentOption);
    const device = useSelector((state:RootState) => state.product.DeviceOption);

    // 검색 ID
    const [searchId, setSearchId] = useState<string>("");
    // 가이드 목록
    const [guideObj, setGuideObj] = useState<Guide[]>([]);
    // 저장 시 모달(true일 때 모달을 띄움)
    const [isSaved, setIsSaved] = useState(false);
    // 모달 뒤의 배경(배경 클릭 시 모달창이 꺼짐)
    const modalBackground = useRef<HTMLDivElement>(null);
    // API 도메인 // const apiUrl = process.env.REACT_APP_API_URL;
    const apiUrl = "http://121.252.183.23:8080"
    // 유저 네임
    const [name, setName] = useState<string | null>('');
    // check_result 저장
    const [selectedResult, setSelectedResult] = useState<string[]>([]);
    // check_reason 한글로 저장
    const [ByRowKorean, setByRowKorean] = useState<{ [key: number]: string[] }>({});
    // 페이지 인덱싱
    // const { pageIndex, pageSize } = state
    // 이미지 클릭 시 띄울 iframe
    const [iframeSrcs, setIframeSrcs] = useState<string>("");
    const [iframeDesc, setIframeDesc] = useState<string>("");
    const [iframeArea, setIframeArea] = useState<string>("");
    // 이미지 클릭 시 링크 열기
    const [isIframeOpen, setIsIframeOpen] = useState(false);

    /** 
     * @function
     * 한 페이지의 테이블 길이를 설정하는 함수입니다. (단일 페이지로 설정: 1000)
     */
    const handleSetPageSize = () => {
        setPageSize(1000);
    }

    /**
     * @function
     * Table Data 전체를 받아오는 API 함수를 호출합니다.
     */
    const getAPI = async () => {
        setName(getCookie('myName'));
        const tableData = await getAPI_(apiUrl, date, ct, result, pagetype, component, device);
        if (tableData !== "error") {
            setDataList(tableData);
            setDataBackup(tableData);
        }
    };

    /**
     * @function
     * 각 행의 Title에 맞는 가이드 목록을 받아오는 API 함수를 호출합니다.
     */
    const getGuideAPI = async () => {
        const guideData = await getGuideAPI_(apiUrl);
        if (guideData !== "error") setGuideObj(guideData);
    }

    useEffect(() => { getGuideAPI(); }, [])

    /**
     * @function
     * product ID 검색 결과를 받아오는 API 함수를 호출합니다.
     */
    const searchAPI = async () => {
        if (Number(searchId) > 0) {
            const tableData = await searchAPI_(searchId, apiUrl);
            if (tableData !== "error") {
                setDataList(tableData);
                setDataBackup(tableData);
            }
        }
    }

    /**
     * @function
     * 저장 완료 모달이 닫힐 때 isSaved 상태를 false로 설정합니다.
     */
    const closeModal = () => {
        setIsSaved(false);
    };

    /**
     * @function
     * Check 결과&가이드 값을 수정할 때, 데이터를 저장하고 갱신하는 함수입니다.
     * @param id 
     * @param ri 
     * @param idlist 
     */
    const editAPI = async (id: number, ri: number, idlist: number[]) => {
        try {
            const YN = selectedResult[ri];

            // 예외처리. 조건에 맞지 않는 저장을 시도할 때
            if (!checkSync(YN, idlist)) {
                throw new Error("Result와 Guide 싱크가 맞지 않습니다.");
            }
            console.log(name)
            const editData = await editAPI_(apiUrl, YN, name, id, ri, idlist);
            if (editData !== "error") {
                console.log("저장 완료", YN, idlist);

                setDataList(prevDataList => {
                    const newDataList = [...prevDataList];
                    newDataList[ri].check_result = YN;
                    newDataList[ri].check_reason = idlist;
                    return newDataList;
                });
                setDataBackup(prevDataBackup => {
                    const newDataBackup = [...prevDataBackup];
                    newDataBackup[ri].check_result = YN;
                    newDataBackup[ri].check_reason = idlist;
                    return newDataBackup;
                });
                setIsSaved(true);
            }

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

            console.log("기존 reason ", dataBackup[ri]?.check_reason);
        }
    }

    /**
     * @function
     * Check 결과&가이드 저장 시, 올바르지 않은 예외상황을 처리하는 함수입니다.
     * @param YN 
     * @param combined 
     * @returns 
     */
    const checkSync = (YN: string, combined: number[]) => {
        combined = combined.map(Number);
        if (YN === 'N') if (combined.includes(1)) return false;
        if (YN === 'Y') {
            if (!combined.includes(1)) return false;
            if (combined.length !== 1) return false;
        }
        if (combined == null || combined.length < 1) return false;
        if (YN == null) return false;
        return true;
    }

    /**
     * @function
     * Check 값을 저장해둔 dataList 배열을 초기화 및 갱신하는 함수입니다.
     */
    const resetSelectedResult = useCallback(() => {
        const updatedValues: string[] = [];
        dataList.forEach((item, index) => {
            updatedValues[index] = dataList[index].check_result;
        });
        setSelectedResult(updatedValues);
    }, [dataList]);

    /**
     * @function
     * 가이드 ID 리스트를 한글값 리스트로 초기화 및 갱신하는 함수입니다.
     */
    const resetSelectedGuides = useCallback(() => {
        setByRowKorean([]);
        const koreans: { [key: number]: string[] } = {};

        dataList?.forEach((item, index) => {
            const guideIds = item.check_reason;
            const uniqueKoreans: Set<string> = new Set();
            if (Array.isArray(guideIds) && Array.isArray(guideObj)) {
                guideIds.forEach((guideId) => {
                    guideObj.forEach((obj) => {
                        if (obj.id === guideId) {
                            uniqueKoreans.add(obj.reason_value_kor);
                        }
                    });
                });
            }
            // Set을 다시 배열로 변환하여 koreans에 할당
            koreans[index] = Array.from(uniqueKoreans);
        });
        setByRowKorean(koreans);
    }, [dataList, guideObj]);

    // dataList(전체 데이터)가 변경될때마다 결과 및 가이드 배열을 갱신
    useEffect(() => {
        resetSelectedResult();
        resetSelectedGuides();
    }, [dataList, resetSelectedGuides, resetSelectedResult]);

    /**
     * @function
     * 가이드 드롭다운에서 선택한 값을 가이드 리스트에 추가하는 함수입니다.
     * @param ri 
     * @param selectedValue 
     * @returns 
     */
    const handleDropdownChangeReason = (ri: number, selectedValue: number) => {
        if (selectedValue <= 0) return;
        const selectedItem = guideObj.find(item => item.id === selectedValue);
        console.log("item all : ", selectedItem)
        let korValue = "";
        if (selectedItem) {
            korValue = selectedItem.reason_value_kor;
        }

        setByRowKorean(prevState => {
            const updatedRow = [...(prevState[ri] || [])];
            if (!updatedRow.includes(korValue)) {
                updatedRow.push(korValue);
            }
            return { ...prevState, [ri]: updatedRow };
        });
    }

    /**
     * @function
     * 가이드 값 삭제 버튼을 누르면 가이드 리스트에서 값을 제거하는 함수입니다.
     * @param rowIndex 
     * @param m 
     */
    const handleRemoveValue = (rowIndex: number, m: string) => {
        setByRowKorean({
            ...ByRowKorean,
            [rowIndex]: ByRowKorean[rowIndex].filter((value: any) => value !== m)
        });
    };

    /**
     * @function
     * 필터 선택 후 '테이블 보기' 버튼 클릭 시 테이블을 불러오는 이벤트 함수입니다.
     */
    const handleFilter = () => {
        handleSetPageSize();
        getAPI();
    }

    /**
     * @function
     * dataList result 상태를 갱신하는 Result 라디오 버튼 선택 이벤트 함수입니다.
     * @param ri 
     * @param value 
     */
    const handleRadioChange = (ri: number, value: string) => {
        setSelectedResult(prevDataList => {
            const newDataList = [...prevDataList];
            newDataList[ri] = value;
            return newDataList;
        });
        console.log(value);
    };

    /**
     * @function
     * 저장 버튼 클릭 시, 데이터 전처리 후 edit API를 호출하는 이벤트 함수입니다.
     * @param ri 
     * @param id 
     */
    const handleButtonClick = (ri: number, id: number) => {
        // 가이드 목록을 문자열로 통합하는 함수로 이동
        const SaveEdit = new saveEdit();
        let idlist: number[] = SaveEdit.combineGuidesToId_(guideObj, ByRowKorean, id, ri);
        editAPI(id, ri, idlist);
    }

    /**
     * @function
     * 이미지 클릭 시 발생하는 이벤트 함수입니다.
     */
    const handleImgClick = useCallback((imgData: datalist) => {
        setIframeSrcs(imgData.contents);
        setIframeDesc(imgData.description);
        setIframeArea(imgData.area);
        setIsIframeOpen(true);  // Open the iframe
    }, [setIframeSrcs, setIframeDesc, setIframeArea]);

    /**
     * @function
     * 이미지 Iframe이 닫히도록 하는 이벤트 함수입니다.
     */
    const handleIframeClose = useCallback(() => {
        setIframeSrcs("");
        setIframeDesc("");
        setIframeArea("");
        setIsIframeOpen(false);  // Close the iframe
    }, [setIframeSrcs, setIframeDesc, setIframeArea]);

    return (
        <div>
            <Provider store={store}>
                <header className="header-wrap">
                    <p className="text-type">Humint QA</p>
                    <div className="text-user">☑️ {getCookie('myName')}님 환영합니다.</div>
                </header>
                    {/* 테이블 위 Filter */}
                    <div className="filter-wrap">
                        {/* 필터 선택 및 '테이블 보기' 버튼 */}
                        <div className= "filter-required">
                            <Filters.SelectDate />
                            <Filters.SelectSiteCode />
                            <button className='btn-type btn-filter' onClick={() => handleFilter()}>테이블 보기</button>
                            {/* 검색 입력창 및 '검색' 버튼 */}
                            <div className="search-wrap">
                                <input
                                    type="text"
                                    value={searchId}
                                    onChange={(e) => setSearchId(e.target.value)}
                                    placeholder="Search for ID"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            searchAPI();
                                        }
                                    }}
                                />
                                <button onClick={() => searchAPI()} className='btn-type btn-search'>검색</button>
                            </div>   
                        </div>
                        <div className= "filter-selection">
                            <Filters.SelectResult />
                            <Filters.SelectPage />
                            <Filters.SelectComponent />
                            <Filters.SelectDevice />
                        </div>
                    </div>

            </Provider>
            <div className="table-wrap">
                <table {...getTableProps()} >

                    {/* table head */}
                    <ColGroup />
                    <thead>
                        {headerGroups.map((headerGroup: any, headerGroupIndex: number) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroupIndex}>
                                {headerGroup.headers.map((column: any, columnIndex: number) => {
                                    const thProps = column.getHeaderProps();
                                    const isSpecialColumn = headerGroupIndex === 0 && (columnIndex === 9 || columnIndex === 10); // 10번째와 11번째 인덱스

                                    return (
                                        <th
                                            {...thProps}
                                            key={columnIndex}
                                            style={{
                                                backgroundColor: isSpecialColumn ? '#587cfe' : '#424242',
                                            }}
                                        >
                                            {column.render('Header')}
                                        </th>
                                    );
                                })}
                            </tr>
                        ))}
                    </thead>

                    {/* table body */}
                    {dataList && dataList.length > 0 ? (

                        <tbody {...getTableBodyProps()}>

                            {page.map((row: any, ri: number) => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map((cell: any, index: number) => {

                                            return (
                                                <React.Fragment key={index}>
                                                    {index === row.cells.length - 4 ? ( // Check 열에 라디오 버튼 생성

                                                        <CheckResultColumns
                                                            ri={ri}
                                                            dataList={dataList}
                                                            selectedResult={selectedResult}
                                                            handleRadioChange={handleRadioChange}
                                                        />
                                                    ) : index === row.cells.length - 3 ? ( // Guide 열에 드롭다운 생성

                                                        <CheckReasonColumns
                                                            ri={ri}
                                                            dataList={dataList}
                                                            guideObj={guideObj}
                                                            ByRowKorean={ByRowKorean}
                                                            handleRemoveValue={handleRemoveValue}
                                                            handleDropdownChangeReason={handleDropdownChangeReason}
                                                        />
                                                    ) : index === row.cells.length - 2 ? ( // Image 열에 이미지를 보여줌

                                                        <td {...cell.getCellProps()} className="img-wrap">
                                                            {/* contents가 https로 시작한다면 이미지 출력, 너비 고정 */}
                                                            {dataList[ri].contents && dataList[ri].contents.startsWith("https:") ? (
                                                                <div>
                                                                    <img src={dataList[ri].contents} alt="" style={{ width: '300px', cursor: "pointer" }}
                                                                        onClick={() => handleImgClick(dataList[ri])} />
                                                                </div>
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
                                                                        <div className="modal-container" ref={modalBackground} onClick={e => {
                                                                            if (e.target === modalBackground.current) {
                                                                                closeModal();
                                                                            }
                                                                        }}>
                                                                            <div className="modal-content">
                                                                                <div className="modal-sub">
                                                                                    <p>저장되었습니다.</p>
                                                                                    <button className="modal-close-btn" onClick={closeModal}>
                                                                                        닫기
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </td>
                                                            </>
                                                        ) : (<td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
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
            {isIframeOpen && iframeSrcs ? (
                <ImgIframe
                    src={iframeSrcs}
                    imgDesc={iframeDesc}
                    imgArea={iframeArea}
                    onClose={handleIframeClose}
                />
            ) : null}
            <ScrollToTopBtn />
        </div>
    );
}

export default Table;