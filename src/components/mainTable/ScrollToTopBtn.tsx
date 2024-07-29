import React, { useState, useEffect } from 'react';

/**
 * ScrollToTopBtn.tsx - 페이지의 최상단으로 이동하는 버튼 컴포넌트입니다.
 * @returns 
 */
const ScrollToTopBtn: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  /**
   * @function
   * 버튼이 특정 조건일 때만 나타나게 하는 이벤트 핸들러 함수입니다.
   */
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  /**
   * @function
   * 페이지의 맨 윗부분으로 자동 스크롤하는 함수입니다.
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} style={styles.scrollToTopButton}>
          ▲ Top
        </button>
      )}
    </div>
  );
};

const styles = {
  scrollToTopButton: {
    position: 'fixed' as 'fixed',
    bottom: '30px',
    right: '40px',
    padding: '12px 20px',
    fontSize: '16px',
    backgroundColor: '#1196DD',
    opacity: '0.7',
    color: '#FFF',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 99
  }
};

export default ScrollToTopBtn;
