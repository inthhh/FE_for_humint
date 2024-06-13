import { useState } from 'react';
import { Guide, datalist, Guideline } from '../interfaces';

class SaveEdit {
    public guideObj_: Guide[] = [];
  
    public combineGuidesToId_( guideObj: Guide[], ByRowKorean: { [key: number]: string[] },
        id: number,
        rowIndex: number ) : number[] {
        console.log("gggg", guideObj)
        this.guideObj_ = guideObj;
        let idlist: number[] = [];
        
        console.log(ByRowKorean[rowIndex]);
        if (ByRowKorean[rowIndex]) {
          idlist = ByRowKorean[rowIndex].map(koreanValue => this.koreanValueToId_(koreanValue));
          console.log(idlist, rowIndex);
        }
        return idlist;
    }
  
    // 한국어 값을 id로 변환하는 함수
    public koreanValueToId_ (koreanValue: string) : number {
        // console.log(this.guideObj_)
        const guideItem = this.guideObj_.find((obj) => obj.reason_value_kor === koreanValue);
        console.log("id변환값 : ", guideItem?.id);
        // 변환값에 해당하는 항목이 있으면 id 값을 반환, 없으면 -1 반환
        return guideItem ? guideItem.id : -1;
    };
}

export default SaveEdit;