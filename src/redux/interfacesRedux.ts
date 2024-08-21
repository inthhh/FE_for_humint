export interface ProductState {
    /**
     * redux : 날짜 옵션
     */
    DateOption: string | null;
    /**
     * redux : 결과값 옵션
     */
    ResultOption: string | null;
    /**
     * redux : 국가코드 옵션
     */
    SiteCodeOption: string | null;
    /**
     * redux : 페이지 타입 옵션
     */
    PageTypeOption: string | null;
    /**
     * redux: 컴포넌트 옵션
     */
    ComponentOption: string | null;
    /**
     * redux: 디바이스 옵션
     */
    DeviceOption: string | null;
}

export interface UserState {
    /**
     * redux : 유저 네임 (사용자 아이디)
     */
    myName: string | null;
}