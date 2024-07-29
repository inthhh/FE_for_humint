import React from "react";

/**
 * colGroup.tsx - 각 열의 스타일을 설정한 컴포넌트입니다.
 * @returns 
 */
export const ColGroup: React.FC = () => {
    return (
        <colgroup>
            {/* 각 열의 스타일 설정 */}
            <col />
            <col />
            <col />
            <col style={{ width: '50px' }} />
            <col />
            <col />
            <col />
            <col />
            <col style={{ width: '200px' }} />
            <col style={{ width: '100px', backgroundColor: '#f3f3fd' }} />
            <col style={{ width: '200px', backgroundColor: '#f3f3fd' }} />
            <col style={{ width: '350px' }} />
            <col />
        </colgroup>
    )
}