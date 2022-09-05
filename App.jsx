import React, { useState, useEffect } from "react";
import About from "./routes/About";
import Home from "./routes/Home";
import Join from "./routes/Join";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Grid from "./components/Grid";
import Image from "./components/Image";
import axios from "axios";
import Login from "./components/Login";
import Head from "./components/Head";
import Profile from "./components/Profile";
import Layout from "./layouts/Layout";
import "./App.css";
function App() {
  const [loginToggle, setLoginToggle] = useState(false);
  const onLoginToggle = () => {
    setLoginToggle(!loginToggle);
  };

  const join = async (nameValue, phoneValue, IdValue, passWordValue) => {
    try {
      const data = await axios.post(`http://localhost:3002/users/add`, {
        name: nameValue,
        phone: phoneValue,
        Id: IdValue,
        passWord: passWordValue,
      });
      // setUsers(data.data);
    } catch (e) {
      setError(e);
    }
  };
  return (
    //https://velog.io/@jjhstoday/AWS-EC2%EC%97%90-React-Node.js-%EC%95%B1-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-1-AWS-EC2-instance-%EC%83%9D%EC%84%B1
    // AWS React 연결 블로그
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              onLoginToggle={onLoginToggle}
              setLoginToggle={setLoginToggle}
              loginToggle={loginToggle}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/join" element={<Join />} />
      </Routes>
    </Router>
  );
}

export default App;
// Git 작업순서
// 1.git init (git 폴더생성. 초기화?)
// 2.git remote -v  -> https://github.com/byunghoonyoon/???  아마 다르게 나올거임.
// 3.git remote set-url origin https://github.com/byunghoonyoon/Instagram
// 위 3번으로 인해 원격저장소가 제 git으로 지정됩니다.
// 4.다시 2번 실행후, git remote set-url origin https://github.com/byunghoonyoon/Instagram 잘나오는지 확인
// 5.git config --global user.name"Github ID" -> Github Id에 Github 이름쓰세요
// 6.git config --global user.email "Github Email" -> Github 로그인하는 이메일 쓰세요
// 7-1. Windows라면 git config --global core.autocrlf true
// 7-2. Mac이라면 git config --global core.autocrlf input
// 8. git add .
// 9. git commit -m " 주석내용 "
// 10. git push origin master
// https://wiken.io/b/8222/9066 상세하게 나와있음.
// 네명이서 작업을 같이 하며 병합,다운,업로드 할때 에러가 날수도 있음.
