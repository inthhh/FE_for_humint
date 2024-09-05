import React, { useEffect, useMemo, useState } from "react";

/**
 * src, imgDesc, imgArea 등을 포함하는 인터페이스입니다.
 */
interface ImgIframeProps {
  src: string;
  imgDesc: string;
  imgArea: string;
  onClose: () => void;
}

/**
 * imgIframe.tsx - 이미지 클릭 시 나타나는 Grid 가이드를 포함한 Iframe 컴포넌트입니다.
 * @param param0
 * @returns
 */
const ImgIframe: React.FC<ImgIframeProps> = ({ src, imgDesc, imgArea, onClose }) => {
  const isMobile = imgDesc === "Mobile" ? "mobile" : "pc";
  const [guideSrc, setGuideSrc] = useState<string>("");
  console.log(imgDesc, imgArea);

  /**
   * @function
   * 이미지가 Large Tile일 때, Grid API를 호출하는 함수입니다.
   */
  const calculatedGuideSrc = useMemo(() => {
    if (imgArea.includes("Large")) {
      return `${process.env.REACT_APP_API_URL}/python-api/v1/guide-check?url=${src}&device_type=${isMobile}`;
    }
    return "";
  }, [src, imgArea, isMobile]);

  useEffect(() => {
    if (calculatedGuideSrc) {
      setGuideSrc(calculatedGuideSrc);
    }
  }, [calculatedGuideSrc]);

  /**
   * Iframe의 스타일 요소입니다.
   */
  const styles = {
    modalBackground: {
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modalContent: {
      width: "84%",
      height: "90%",
      backgroundColor: "white",
      padding: "10px",
      borderRadius: "8px",
      overflow: "hidden",
      flexDirection: "column" as const,
      display: "flex",
      justifyContent: "space-between",
      position: "relative" as const,
    },
    iframeStyle: {
      width: "100%",
      height: "100%",
      border: "none",
      backgroundColor: "transparent",
    },
    closeButton: {
      position: "absolute" as const,
      top: "10px",
      right: "10px",
      cursor: "pointer",
      fontSize: "20px",
    },
    text: {
      textAlign: "center" as const,
      marginTop: "5px",
      marginBottom: "0px",
    },
  };

  /**
   * Iframe의 요소를 다루는 html Doc입니다.
   */
  const iframeContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          overflow: hidden;
          background-color: transparent;
        }
        .image-container {
          display: flex;
          ${guideSrc ? "flex-direction: row;" : "flex-direction: column; align-items: center;"}
          width: 100%;
          height: 100%;
          justify-content: center;
        }
        .image-container img {
          width: auto;
          max-height: 600px;
          margin: auto;
          object-fit: cover;
        }
        .guide-image-container {
          position: relative;
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .loading-message {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(255, 255, 255, 0.7);
          padding: 10px;
          border-radius: 5px;
          z-index: 1;
        }
        .guide-image {
          display: none;
          width: 100%;
          height: auto;
          object-fit: cover;
        }
        .main-image {
          ${guideSrc ? "width: 45%; max-height: 350px;" : "width: auto; Height: 700px;"}
          object-fit: cover;
          margin-right: 10px;
        }
      </style>
    </head>
    <body>
      <div class="image-container">
        <img src="${src}" alt="Image 1" class="main-image">
        <div class="guide-image-container">
        ${
          guideSrc
            ? `<div class="loading-message">Grid Guide 로딩 중입니다.<br/>
          이미지 로딩에는 5초 이내의 시간이 소요됩니다.</div>`
            : ""
        }
          ${guideSrc ? `<img src="${guideSrc}" alt="Image 2" class="guide-image" onload="imageLoaded()">` : ""}
        </div>
      </div>
      <script>
        function imageLoaded() {
          document.querySelector('.loading-message').style.zIndex = '-1';
          document.querySelector('.guide-image').style.display = 'block';
        }
      </script>
    </body>
    </html>
    `;

  return (
    <div style={styles.modalBackground} onClick={onClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <iframe
          id="imageFrame"
          srcDoc={iframeContent}
          title="Image Frame"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
        <p style={styles.text}>모달의 바깥 영역을 클릭 시 창이 닫힙니다.</p>
        <div style={styles.closeButton} onClick={onClose}>
          X
        </div>
      </div>
    </div>
  );
};

export default ImgIframe;
