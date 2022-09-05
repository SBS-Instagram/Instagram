import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import Logo from "../public/Logo.PNG";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// $ npm i @fortawesome/fontawesome-svg-core
// $ npm i @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-brands-svg-icons
// $ npm i @fortawesome/react-fontawesome 폰트어썸사용법
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons"; ->카멜표기법
{
  /* <FontAwesomeIcon icon={faTrashCan} /> 본문호출법*/
}

const Login = ({ onLoginToggle, setLoginToggle }) => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onIdChange = (e) => {
    setIdValue(e.target.Value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.Value);
  };
  return (
    <div className="Login">
      <img
        className="Logo"
        src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
      />
      <button
        className="loginCloseBtn"
        onClick={() => {
          onLoginToggle();
        }}
      >
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
      <div className="input1">
        <input
          type="text"
          placeholder="아이디"
          style={{ marginBottom: "5px" }}
          value={idValue}
          onChange={onIdChange}
        />
        <input
          type="Password"
          placeholder="비밀번호"
          value={passwordValue}
          onChange={onPasswordChange}
        />
      </div>
      <div className="Button">
        <button className="LoginButton">로그인</button>
        <a href="/Join">
          <button className="UserButton">가입하기</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
