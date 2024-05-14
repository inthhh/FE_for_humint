import axios from "axios";
import React, { useEffect, useState } from "react"


export interface Guide {
    id : number,
    reason_value_eng : string,
    reason_value_kor : string,
    reason_subject : string
}

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
    check_reason: string;
    created_at: string;
    updated_at: string;
  }

  export interface Guideline {
    eng: string
    kor: string
  }