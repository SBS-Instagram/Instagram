import React, { useState, useEffect } from "react";
import About from "./routes/About";
import LoginedHome from "./routes/LoginedHome";
import UnLoginedHome from "./routes/UnLoginedHome";
// 기존 Home 에서 로그인 / 비로그인구별함. 3,4번째줄.
import Join from "./routes/Join";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import Grid from "./components/Grid";
import Image from "./components/Image";
import axios from "axios";
import Login from "./components/Login";
import LoginedHead from "./components/LoginedHead";
import LoginedProfile from "./components/LoginedProfile";
import UnLoginedProfile from "./components/UnLoginedProfile";
import Welcome from "./routes/Welcome";
import Layout from "./layouts/Layout";
import "./App.css";
import { useRecoilState } from "recoil";
import { authenticatedState } from "./recoil/auth";
import GridDetail from "./components/GridDetail";
import { useNavigate, useParams } from "react-router-dom";
import Main from "./components/Main";
import Saved from "./components/Saved";
// 로그인유지법 https://velog.io/@hongwr/2022.03.24
// 9.13 ALTER TABLE insta ADD COLUMN article INT DEFAULT 0;
// insta 테이블쿼리 게시물갯수 컬럼추가
// UPDATE insta SET article = article+1 WHERE userid = 'test';

function App() {
  const { userid } = useParams();
  const [logined, setLogined] = useRecoilState(authenticatedState);
  const [loginToggle, setLoginToggle] = useState(false);
  const [error, setError] = useState(null);
  const [searchedList, setSearchedList] = useState([]);
  const [isFollowed, setIsFollowed] = useState(true);
  const [user, setUser] = useState(
    () => JSON.parse(sessionStorage.getItem("user")) || ""
  );
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const [images, setImages] = useState([]);
  const [addImageToggle, setAddImageToggle] = useState(false);

  useEffect(() => {
    if (user.userid == undefined) {
      setLogined(false);
    }
  }, []);
  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const onDeleteToggle = () => {
    setDeleteToggle(!deleteToggle);
  };

  const onLoginToggle = () => {
    setLoginToggle(!loginToggle);
  };
  const onAddImageToggle = () => {
    setAddImageToggle(!addImageToggle);
  };
  const joinMember = async (nameValue, phoneValue, IdValue, passWordValue) => {
    try {
      const data = await axios.post(`http://localhost:3002/joinMember`, {
        username: nameValue,
        phone: phoneValue,
        userid: IdValue,
        password: passWordValue,
      });
    } catch (e) {
      setError(e);
    }
  };
  // https://www.daleseo.com/react-hooks-use-web-storage/ 세션스토리지 블로그
  const onLogin = async (idValue, passwordValue) => {
    setUser("");
    try {
      const data = await axios.post(`http://localhost:3002/loginMember`, {
        userid: idValue,
        password: passwordValue,
      });
      sessionStorage.setItem("user", JSON.stringify(data.data.user));
      setLogined(data.data.authenticated);
      onLoginToggle();
      setUser(data.data.user);
    } catch (e) {
      setError(e);
    }
  };
  //https://velog.io/@jjhstoday/AWS-EC2%EC%97%90-React-Node.js-%EC%95%B1-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-1-AWS-EC2-instance-%EC%83%9D%EC%84%B1
  // AWS React 연결 블로그
  //메세지 https://cocoder16.tistory.com/62
  const onSearch = async (searchValue) => {
    try {
      const data = await axios({
        url: `http://localhost:3002/instaSearch/${searchValue}`,
        method: "GET",
      });
      if (data.data) {
        setSearchedList(data.data);
      } else {
        setSearchedList([]);
      }
    } catch (e) {
      setError(e);
    }
  };
  // https://v5.reactrouter.com/web/example/url-params
  // router path param

  // 팔로우 체크
  // 팔로우중이면 true , 아니면 false 반환
  const onFollowCheck = async (reqId, resId) => {
    try {
      const data = await axios.get(
        `http://localhost:3002/isFollowed?reqId=${reqId}&resId=${resId}`,
        {}
      );

      if (data.data) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    } catch (e) {
      setError(e);
    }
  };

  const onRemove = async (id) => {
    try {
      await axios({
        url: `http://localhost:3002/delete?id=${id}&userid=${user.userid}`,
        method: "DELETE",
      });
    } catch (e) {
      setError(e);
    }
  };

  const onLike = async (id, userid, imgSrc) => {
    try {
      const data = await axios.post(
        `http://localhost:3002/like?id=${id}&userid=${userid}&userimgSrc=${imgSrc}`
      );
    } catch (e) {
      setError(e);
    }
  };

  //9.27 댓글테이블 수정(없으면 추가)
  // CREATE TABLE reply_table (
  //   id INT AUTO_INCREMENT PRIMARY KEY,
  //   articleid INT,
  //   replyid VARCHAR(50),
  //   reply VARCHAR(255)
  // );

  // 메시지 https://youngbean96.tistory.com/10
  // 위치추적 geolocation
  return (
    <div>
      {logined ? (
        <Router>
          <Routes>
            {/* <Route 
              path="/"
              element={<Home />}
            /> */}
            <Route
              path="/"
              element={
                <Main
                  onLoginToggle={onLoginToggle}
                  setLoginToggle={setLoginToggle}
                  logined={logined}
                  setLogined={setLogined}
                  user={user}
                  setUser={setUser}
                  onSearch={onSearch}
                  setAddImageToggle={setAddImageToggle}
                  onAddImageToggle={onAddImageToggle}
                  searchedList={searchedList}
                  setSearchedList={setSearchedList}
                  onLike={onLike}
                />
              }
            />
            <Route
              path="/:userid"
              element={
                <LoginedHome
                  onLoginToggle={onLoginToggle}
                  setLoginToggle={setLoginToggle}
                  logined={logined}
                  setLogined={setLogined}
                  setUser={setUser}
                  onSearch={onSearch}
                  setAddImageToggle={setAddImageToggle}
                  onAddImageToggle={onAddImageToggle}
                  searchedList={searchedList}
                  setSearchedList={setSearchedList}
                  loginToggle={loginToggle}
                  onLogin={onLogin}
                  user={user}
                  setImages={setImages}
                  images={images}
                  addImageToggle={addImageToggle}
                  onRemove={onRemove}
                  onFollowCheck={onFollowCheck}
                  isFollowed={isFollowed}
                  setIsFollowed={setIsFollowed}
                  onLike={onLike}
                />
              }
            />

            <Route
              path="/join"
              element={
                <Join joinMember={joinMember} onLoginToggle={onLoginToggle} />
              }
            />
            <Route
              path="/:userid/:id"
              element={
                <GridDetail
                  user={user}
                  onLike={onLike}
                  onRemove={onRemove}
                  deleteToggle={deleteToggle}
                  onDeleteToggle={onDeleteToggle}
                  setDeleteToggle={setDeleteToggle}
                  menuToggle={menuToggle}
                  setMenuToggle={setMenuToggle}
                  onMenuToggle={onMenuToggle}
                  onLoginToggle={onLoginToggle}
                  setLoginToggle={setLoginToggle}
                  logined={logined}
                  setLogined={setLogined}
                  setUser={setUser}
                  onSearch={onSearch}
                  setAddImageToggle={setAddImageToggle}
                  onAddImageToggle={onAddImageToggle}
                  searchedList={searchedList}
                  setSearchedList={setSearchedList}
                />
              }
            />
            <Route
              path="/:userid/saved/saved"
              element={
                <Saved
                  onLoginToggle={onLoginToggle}
                  setLoginToggle={setLoginToggle}
                  logined={logined}
                  setLogined={setLogined}
                  user={user}
                  setUser={setUser}
                  onSearch={onSearch}
                  setAddImageToggle={setAddImageToggle}
                  onAddImageToggle={onAddImageToggle}
                  searchedList={searchedList}
                  setSearchedList={setSearchedList}
                  setImages={setImages}
                  addImageToggle={addImageToggle}
                  onRemove={onRemove}
                  onFollowCheck={onFollowCheck}
                  isFollowed={isFollowed}
                  setIsFollowed={setIsFollowed}
                />
              }
            />
            {/* 잘못된 접근 제한 라우트  */}
            {/* <Route path="/*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Welcome
                  onLogin={onLogin}
                  logined={logined}
                  setLogined={setLogined}
                />
              }
            />
            <Route
              path="/:userid"
              element={
                <UnLoginedHome
                  onLoginToggle={onLoginToggle}
                  setLoginToggle={setLoginToggle}
                  loginToggle={loginToggle}
                  onLogin={onLogin}
                  logined={logined}
                  setLogined={setLogined}
                  onSearch={onSearch}
                  user={user}
                  setUser={setUser}
                  searchedList={searchedList}
                  setSearchedList={setSearchedList}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/join"
              element={
                <Join joinMember={joinMember} onLoginToggle={onLoginToggle} />
              }
            />
            <Route
              path="/:userid/:id"
              element={
                <GridDetail
                  user={user}
                  onLike={onLike}
                  onRemove={onRemove}
                  deleteToggle={deleteToggle}
                  onDeleteToggle={onDeleteToggle}
                  setDeleteToggle={setDeleteToggle}
                  menuToggle={menuToggle}
                  setMenuToggle={setMenuToggle}
                  onMenuToggle={onMenuToggle}
                  onLoginToggle={onLoginToggle}
                  setLoginToggle={setLoginToggle}
                  logined={logined}
                  setLogined={setLogined}
                  setUser={setUser}
                  onSearch={onSearch}
                  setAddImageToggle={setAddImageToggle}
                  onAddImageToggle={onAddImageToggle}
                  searchedList={searchedList}
                  setSearchedList={setSearchedList}
                />
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;

// Git 작업순서
// 1.git init (git 폴더생성. 초기화?)
// 2.git remote -v  -> https://github.com/byunghoonyoon/???  아마 다르게 나올거임.
// 3.git remote set-url origin https://github.com/byunghoonyoon/Instagram
// 위 3번으로 인해 원격저장소가 제 git으로 지정됩니다.
// 4.다시 2번 실행후, git remote set-url origin https://github.com/byunghoonyoon/Instagram 잘나오는지 확인
// 5.git config --global user.name "byunghoonyoon" -> Github Id에 Github 이름쓰세요
// 6.git config --global user.email "qudgns0218@gmail.com" -> Github 로그인하는 이메일 쓰세요
// 무시하세요 https://github.com/SBS-Instagram/Instagram
// 7-1. Windows라면 git config --global core.autocrlf true
// 7-2. Mac이라면 git config --global core.autocrlf input
// 8. git add .
// 9. git commit -m " 주석내용 "
// 10. git push origin master
// https://wiken.io/b/8222/9066 상세하게 나와있음.
// 네명이서 작업을 같이 하며 병합,다운,업로드 할때 에러가 날수도 있음.
