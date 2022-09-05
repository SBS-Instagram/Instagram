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

const Login = ({
  onLoginToggle,
  setLoginToggle,
  onLogin,
  logined,
  setLogined,
}) => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const onIdChange = (e) => {
    setIdValue(e.target.value || "");
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value || "");
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
          onChange={onIdChange}
          type="text"
          placeholder="아이디"
          style={{ marginBottom: "5px" }}
          value={idValue}
        />
        <input
          type="Password"
          placeholder="비밀번호"
          onChange={onPasswordChange}
          value={passwordValue}
        />
      </div>
      <div className="Button">
        <button
          className="LoginButton"
          onClick={() => {
            if (idValue.length == 0) {
              window.alert("아이디를 입력해 주세요");
            } else if (passwordValue.length == 0) {
              window.alert("비밀번호를 입력해 주세요");
            } else {
              onLogin(idValue, passwordValue);
            }
          }}
        >
          로그인
        </button>
        <a href="/Join">
          <button className="UserButton">가입하기</button>
        </a>
      </div>
    </div>
  );
};

export default Login;
