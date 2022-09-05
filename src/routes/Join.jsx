import React, { useState, useEffect } from "react";
import "../styles/Join.css";
const Join = ({ joinMember, onLoginToggle }) => {
  const [idValue, setIdValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [completeToggle, setCompleteToggle] = useState(false);
  const onIdChange = (e) => {
    setIdValue(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const onPhoneChange = (e) => {
    setPhoneValue(e.target.value);
  };

  return (
    <div>
      <div className="joinBar ">
        <img
          className="Logo"
          src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
        />
        <div className="joinBar_Return">
          <a href="/">
            <span>돌아가기</span>
          </a>
        </div>
        <div className="joinBar_span">
          <span>친구들의 사진과 동영상을 보려면 가입하세요.</span>
        </div>
        <div className="joinMemberBtn">
          <input
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
            onChange={onPhoneChange}
            value={phoneValue}
          />
          <input
            type="text"
            placeholder="성명"
            onChange={onNameChange}
            value={nameValue}
          />
          <input
            type="text"
            placeholder="아이디"
            onChange={onIdChange}
            value={idValue}
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={onPasswordChange}
            value={passwordValue}
          />
        </div>
        <div className="joinButton">
          <button
            onClick={() => {
              if (
                nameValue.length > 0 &&
                phoneValue.length > 0 &&
                idValue.length > 0 &&
                passwordValue.length > 0
              ) {
                joinMember(nameValue, phoneValue, idValue, passwordValue);

                setCompleteToggle(!completeToggle);
              } else {
                window.alert("입력 내용을 확인해주세요");
              }
            }}
          >
            가입하기
          </button>
        </div>
        {completeToggle && (
          <div className="joinComplete">
            {" "}
            <a href="/#">
              가입이 완료되었습니다.
              <br />
              "이 곳"을 누른 후
              <br />
              홈페이지에서 로그인 해주세요
            </a>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;
