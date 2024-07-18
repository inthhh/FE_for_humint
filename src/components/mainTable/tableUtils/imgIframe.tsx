import React, { useState } from 'react';
import axios from 'axios';

interface ImgIframeProps {
    src: string;
    imgDesc: string;
    onClose: () => void;
}
  
const ImgIframe: React.FC<ImgIframeProps> = ({ src, imgDesc, onClose }) => {
  const isMobile = (imgDesc=="Mobile")? "mobile" : "pc";
  const guideSrc = `http://121.252.183.23:8080/python-api/v1/guide-check?url=${src}&device_type=${isMobile}`;
    const styles = {
        modalBackground: {
            position: 'fixed' as 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.01)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        modalContent: {
            width: '80%',
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
          justify-content: center;
          align-items: center;
          height: 100%;
          overflow: hidden;
          background-color: transparent;
        }
        .image-container {
          display: flex;
          flex-direction: row;
        }
        .image-container img {
          max-width: ${guideSrc ? '45%' : '100%'};
          margin: 10px 10px 0px 10px;
          min-height: ${guideSrc ? '200px' : '500px'};
          height: auto;
        }
      </style>
    </head>
    <body>
      <div class="image-container">
        <img src="${src}" alt="Image 1">
        ${guideSrc ? `<img src="${guideSrc}" alt="Image 2">` : ''}
      </div>
      <div>
    </div>
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