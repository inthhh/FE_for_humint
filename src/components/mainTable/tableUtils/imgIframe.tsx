import React, { useState } from 'react';
import axios from 'axios';

interface ImgIframeProps {
    src: string;
    imgDesc: string;
    imgArea: string;
    onClose: () => void;
}
  
const ImgIframe: React.FC<ImgIframeProps> = ({ src, imgDesc, imgArea, onClose }) => {
  const isMobile = (imgDesc=="Mobile")? "mobile" : "pc";
  console.log(imgDesc, imgArea, isMobile);
  let guideSrc = "";
  if(imgArea.includes("Large")){
    guideSrc = `http://121.252.183.23:8080/python-api/v1/guide-check?url=${src}&device_type=${isMobile}`;
  }

  const styles = {
        modalBackground: {
            position: 'fixed' as 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContent: {
            width: '84%',
            height: '90%',
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '8px',
            overflow: 'hidden',
            flexDirection: 'column' as const,
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative' as const,
        },
        iframeStyle: {
            width: '100%',
            height: '100%',
            border: 'none',
            backgroundColor: 'transparent',
        },
        closeButton: {
            position: 'absolute' as const,
            top: '10px',
            right: '10px',
            cursor: 'pointer',
            fontSize: "20px",
          },
        text: {
            textAlign: 'center' as const,
            marginTop: '5px',
            marginBottom: '0px',
        },
    };

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
          ${guideSrc ? 'flex-direction: row;' : 'flex-direction: column; align-items: center;'}
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
          ${guideSrc ? 'width: 45%; max-height: 350px;' 
              : 'width: auto; Height: 700px;'}
          object-fit: cover;
          margin-right: 10px;
        }
      </style>
    </head>
    <body>
      <div class="image-container">
        <img src="${src}" alt="Image 1" class="main-image">
        <div class="guide-image-container">
        ${guideSrc ? `<div class="loading-message">Grid Guide 로딩 중입니다.<br/>
          이미지 로딩에는 5초~10초가 소요됩니다.</div>` : ''}
          ${guideSrc ? `<img src="${guideSrc}" alt="Image 2" class="guide-image" onload="imageLoaded()">` : ''}
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
                style={{ width: '100%', height: '100%', border: 'none' }}
            ></iframe>
            <p style={styles.text}>모달의 바깥 영역을 클릭 시 창이 닫힙니다.</p>
            <div style={styles.closeButton} onClick={onClose}>X</div>
          </div>
        </div>
    );
};

export default ImgIframe;