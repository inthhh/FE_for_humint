import axios from "axios";
import React, { useEffect, useState } from "react"

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