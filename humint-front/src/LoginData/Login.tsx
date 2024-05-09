// Login.tsx
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { myName } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {setCookie, getCookie} from '../cookieUtils';
import './Login.css'
import ptkbg from './styles/ptkbackground.jpg'


const Login: React.FC = () => {
  
    const dispatch = useDispatch();
    const myname = useSelector((state: any) => state.myName);
    const [hover, setHover] = useState<string>('');
    const [userId, setId] = useState('');
    const [pwd, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginBTNtext, setBTNtext] = useState<string>('Login')
    const rightPwd = process.env.REACT_APP_PWD;

    const [isShowPwChecked, setShowPwChecked] = useState(false);
    const passwordRef = useRef(null);
    const [pwdType, setPwdType] = useState("password");

    
    const handleHoverBTN=()=>{
        setHover("T");
        setBTNtext("즐거운 하루 되세요");
    }

    const handleLogin = () => {
        // pwd
        console.log(userId);
        if (pwd === rightPwd) {
            dispatch(myName(userId));
            setCookie('myName', userId, 1);
            navigate('/7u8i9o0p!@');
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

  return (
    <div className='loginbody'>
        <div>
      <h2>humint QA Login</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <div>
          <label className="loginLabel" htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            value={userId}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label className="loginLabel" htmlFor="pwd">Password:</label>
          <input
            type={pwdType}
            id="pwd"
            value= {pwd}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="loginBtn" type="submit" onMouseEnter={handleHoverBTN} onMouseLeave={()=>setBTNtext('Login')}>{loginBTNtext}</button>
      </form>
      </div>
    </div>
  );
}

export default Login;