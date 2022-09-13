import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="footerbox mx-auto">
        <ul className="flex flex-row justify-evenly">
          <li>
            <a href="#">Meta</a>
          </li>
          <li>
            <a href="#">소개</a>
          </li>
          <li>
            <a href="#">블로그</a>
          </li>
          <li>
            <a href="#">채용 정보</a>
          </li>
          <li>
            <a href="#">도움말</a>
          </li>
          <li>
            <a href="#">API</a>
          </li>
          <li>
            <a href="#">개인정보처리방침</a>
          </li>
          <li>
            <a href="#">약관</a>
          </li>
          <li>
            <a href="#">인기 계정</a>
          </li>
          <li>
            <a href="#">해시태그</a>
          </li>
          <li>
            <a href="#">위치</a>
          </li>
          <li>
            <a href="#">Instagram Lite</a>
          </li>
          <li>
            <a href="#">연락처 업로드&비사용자</a>
          </li>
        </ul>
        <span>© 2022 Instagram from Meta</span>
      </div>
    </div>
  );
};

export default Footer;
