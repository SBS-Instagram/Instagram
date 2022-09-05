import React, { useState, useEffect } from "react";
import "../styles/Join.css";
const Join = () => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const onIdChange = (e) => {
    setIdValue(e.target.Value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.Value);
  };
  const onNameChange = (e) => {
    setNameValue(e.target.Value);
  };
  const onPhoneChange = (e) => {
    setPhoneValue(e.target.Value);
  };
 
  return (
    <div>
      <div className="joinBar ">
        <img className="Logo" src="https://i.postimg.cc/sD6LQB7F/Logo.png" />
        <div className="joinBar_Return">
          <a href="/">
            <span>돌아가기</span>
          </a>
        </div>
        <div className="joinBar_span">
          <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
        </div>
        <div className="joinInput">
          <input
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
            value={phoneValue}
            onChange={onPhoneChange}
          />
          <input
            type="Password"
            placeholder="성명"
            value={nameValue}
            onChange={onNameChange}
          />
          <input
            type="text"
            placeholder="아이디"
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
        <div className="joinButton">
          <button onClick={()=>{
              Join();
          }}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default Join;
