// cookieUtils.ts

import { Cookies } from 'react-cookie';

/**
 * @function
 * cookieUtils.ts - 쿠키를 생성하는 유틸리티
 * @param name 
 * @param value 
 * @param days 
 */
export function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * @function
 * cookieUtils.ts - 쿠키 값을 가져오는 유틸리티
 * @param name 
 * @returns 
 */
export function getCookie(name: string): string | null {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}