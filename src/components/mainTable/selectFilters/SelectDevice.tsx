import React, {useState,useEffect} from "react";
import { DeviceOption } from '../../../redux/actions/productAction';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../interfaces/interfaceRedux";

function SelectDevice() {
    const [isDropdownView, setDropdownView] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [apiDevice, setApiDevice] = useState([]);
    const dispatch = useDispatch();
    const device = useSelector((state: RootState) => state.product.DeviceOption);

    // 디바이스 목록 정의
    const baseDeviceList = ["ALL", "Mobile", "Desktop"];

    /**
     * @function
     * Raw data의 키를 호출하여 컴포넌트 부분을 추출하는 함수입니다.
     * @param filter 
     */
    const deviceAPI = async (filter: string) => {
        try {
            const url = filter === "ALL" ? `${apiUrl}/api/v1/raw-data/description` : `${apiUrl}/api/v1/raw-data/description?description=${filter}`;
            const { data } = await axios.get(url);
            console.log(data.data);
            setApiDevice(data.data.map((item: { device: any; }) => item.device));
        } catch (e) {
            console.error('DeviceAPI 호출 에러:', e);
        }
    };

    useEffect(() => {
        deviceAPI("ALL"); // 초기에는 "ALL" 데이터를 가져옵니다.
    }, []);

    /**
     * @function
     * 드롭다운 요소 클릭 시, 바로 드롭다운 view 상태를 변경하는 이벤트 함수입니다.
     */
    const handleClickContainer = () => {
        setDropdownView(!isDropdownView);
    };

    /**
     * @function
     * 드롭다운 외부 포커스를 감지하는 이벤트 함수입니다.
     */
    const handleBlurContainer = () => {
        setTimeout(() => {
            setDropdownView(false);
        }, 200);
    };

    /**
     * @function
     * 드롭다운 요소 클릭 이벤트 함수입니다.
     * @param i 
     */
    const onClickEvent = (i: string) => {
        setDropdownView(false);
        if (i === "ALL") {
            dispatch(DeviceOption(''));
        } else {
            dispatch(DeviceOption(i));
        }
        deviceAPI(i); // 선택된 값을 필터로 사용하여 API 호출
    };

    return (
        <div className="container" onBlur={handleBlurContainer}>
            <label onClick={handleClickContainer}>
                <button className='filter-btn-sub'> Device : {device === '' ? 'ALL' : `${device}`} {isDropdownView ? '▲' : '▼'}</button>
            </label>
            {isDropdownView && (
                <ul style={{
                    listStyle: 'none',
                    position: 'absolute',
                    zIndex: 9,
                    maxHeight: '300px',
                    overflowY: 'auto',
                    margin: 0,
                    padding: 0
                }}>
                    {/* sub li */}
                    {baseDeviceList.concat(apiDevice).map((item, i) => (
                        <li key={i} className='limenu-sub' onMouseDown={(e) => { e.preventDefault() }} onClick={() => onClickEvent(item)}>
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}

export default SelectDevice;