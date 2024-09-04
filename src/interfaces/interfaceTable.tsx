/**
 * interfaces.tsx - id, 영어값, 한글값 등 Guide 내용을 저장하는 인터페이스입니다.
 */
export interface Guide {
  id: number,
  reason_value_eng: string,
  reason_value_kor: string,
  reason_subject: string
}

/**
 * interfaces.tsx - id, key, site_code, contents 등 RawData의 모든 내용을 저장하는 인터페이스입니다.
 */
export interface datalist {
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
  check_reason: number[];
  created_at: string;
  updated_at: string;
}

/**
 * interfaces.tsx - 가이드라인의 한글 값과 영어 값을 함께 저장하는 인터페이스입니다.
 */
export interface Guideline {
  eng: string
  kor: string
}


/**
 * interfaces.tsx - 공통적인 필터 드롭다운 컴포넌트의 속성 타입을 저장하는 인터페이스입니다.
 * 
 * @typedef {Object} CommonFilterProps
 * @property {string} label - 드롭다운의 라벨 텍스트
 * @property {string} currentValue - 현재 선택된 값
 * @property {string[]} options - 드롭다운에 표시될 옵션 배열
 * @property {function(string): void} onOptionChange - 선택된 값이 변경될 때 호출되는 콜백 함수
 * @property {'primary' | 'sub'} [filterType] - 드롭다운 버튼 스타일 타입
 */
export interface CommonFilterProps { //다양한 데이터 렌더링 시 ReactNode 사용
  label: string;
  currentValue: string;
  options: string[];
  onOptionChange: (value: string) => void;
  buttonCSS?: string; // 드롭다운 버튼 CSS
  dropdownCSS?: string; // 드롭다운 리스트 CSS
}

export interface LabelComponentProps {
  label: string;
  currentValue: string;
  isDropdownView: boolean;
  handleClick: () => void;
  buttonCSS: string;
}

export interface OptionsComponentProps {
  options: string[];
  handleOptionClick: (option: string) => void;
  dropdownCSS: string;
}

export interface GeneralFilterProps {
  label: string;
  selectedValue: string;
  action: (value: string) => any;
  options: string[];
  defaultValue?: string;
  buttonCSS?: string;
  dropdownCSS?: string;
}