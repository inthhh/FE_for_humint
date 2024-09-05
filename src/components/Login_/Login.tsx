import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './Login.css';
import { myName } from '../../redux/actions/userAction';
import { setCookie } from '../../utils/cookieUtils';

/**
 * Login.tsx - 로그인 페이지 및 기능 컴포넌트입니다.
 * @returns Login Page
 */
const Login: React.FC = () => {
    const dispatch = useDispatch();
    // const myname = useSelector((state: RootState) => state.user.myName);
    const [, setHover] = useState<string>('');
    const [userId, setId] = useState('');
    const [pwd, setPassword] = useState('');
    const navigate = useNavigate();
    const [loginBTNtext, setBTNtext] = useState<string>('로그인 🚀');
    const rightPwd = "neptunepulse@@";
    const [isShowPwChecked, setShowPwChecked] = useState(false);
    // const passwordRef = useRef(null);
    const [pwdType, setPwdType] = useState("password");

    /**
     * @function
     * 로그인 버튼에 마우스 커서를 올리면 메시지가 나타나는 이벤트 함수입니다.
     */
    const handleHoverBTN = () => {
        setHover("T");
        setBTNtext("즐거운 하루 되세요");
    }

    /**
     * @function
     * 아이디를 redux 변수에 저장하고, 비밀번호를 암호와 비교하는 함수입니다.
     */
    const handleLogin = () => {
        if (pwd === rightPwd) {
            dispatch(myName(userId));
            setCookie('myName', userId, 1);
            navigate('/table-board');
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    };

    /**
     * @function
     * 비밀번호를 password 형태로 암호화할지, text로 보여줄지 선택하는 onClick 이벤트입니다.
     */
    const toggleShowPassword = () => {
        setShowPwChecked(!isShowPwChecked);
        setPwdType(isShowPwChecked ? "password" : "text");
    };

    return (
        <div className='login-container'>
            <div className='login-left'>
                <h1>Thank you for joining our QA team<br />on this long journey to Neptune.</h1>
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
                            style={{ border: "1px solid #999" }}
                        />
                    </div>
                    <div>
                        <label className="login-label" htmlFor="pwd">Password</label>
                        <input
                            type={pwdType}
                            id="pwd"
                            value={pwd}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ marginBottom: "0", border: "1px solid #999" }}
                        />
                        <button type="button" className="toggle-password" onClick={toggleShowPassword}>
                            {isShowPwChecked ? "Hide password" : "Show password"}
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
