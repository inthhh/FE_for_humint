import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import './Login.css';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import { myName } from "../../redux/store";
import {setCookie, getCookie} from '../../utils/cookieUtils';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const myname = useSelector((state: any) => state.myName);
    const [hover, setHover] = useState<string>('');
    const [userId, setId] = useState('');
    const [pwd, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginBTNtext, setBTNtext] = useState<string>('로그인 🚀');
    const rightPwd = "neptunepulse@@";
    const [isShowPwChecked, setShowPwChecked] = useState(false);
    const passwordRef = useRef(null);
    const [pwdType, setPwdType] = useState("password");

    const handleHoverBTN = () => {
        setHover("T");
        setBTNtext("즐거운 하루 되세요");
    }

    const handleLogin = () => {
        if (pwd === rightPwd) {
            dispatch(myName(userId));
            setCookie('myName', userId, 1);
            navigate('/7u8i9o0p!@');
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    const toggleShowPassword = () => {
      setShowPwChecked(!isShowPwChecked);
      setPwdType(isShowPwChecked ? "password" : "text");
  };

    return (
        <div className='login-container'>
            <div className='login-left'>
                <h1>Thank you for joining our QA team<br/>on this long journey to Neptune.</h1>
                <div className='rocket'></div>
            </div>
            <div className='login-right'>
                <h2>Login for Humint QA</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div>
                        <label className="login-label" htmlFor="id">ID</label>
                        <input
                            type="text"
                            id="id"
                            value={userId}
                            onChange={(e) => setId(e.target.value)}
                            style={{border:"1px solid #999"}}
                        />
                    </div>
                    <div>
                      <label className="login-label" htmlFor="pwd">Password</label>
                      <input
                            type={pwdType}
                            id="pwd"
                            value={pwd}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{marginBottom:"0", border:"1px solid #999"}}
                        />
                        <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                          {isShowPwChecked ? "Hide password": "Show password"}
                        </button>
                    </div>
                    <button className="login-btn" type="submit" onMouseEnter={handleHoverBTN} 
                      onMouseLeave={() => setBTNtext('로그인 🚀')}>{loginBTNtext}</button>
                    <div className="forgot-password">비밀번호를 잊으셨나요? 랍 / 젬마 / 헤더에게 문의하세요.</div>
                </form>
            </div>
        </div>
    );
}

export default Login;
