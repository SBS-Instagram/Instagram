import React, { useState, useEffect } from "react";
import "../styles/LoginedHead.css";
import {
  FaRegComment,
  FaSearch,
  FaHome,
  FaUserAlt,
  FaPlusSquare,
  FaWindowClose,
} from "react-icons/fa";
import { useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const LoginedHead = ({
  setLoginToggle,
  onLoginToggle,
  logined,
  setLogined,
  onSearch,
  user,
  setUser,
  setAddImageToggle,
  onAddImageToggle,
  searchedList,
  setSearchedList,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [imgSrc, setImgSrc] = useState(user.userimgSrc);
  const [searchToggle, setSearchToggle] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  useEffect(() => {
    //useEffect 사용이유
    //setState는 비동기처리라서, 보류처리된 후 한발짝 늦게 적용된다.
    //그래서 asd라고 입력해도 as 까지만 나온다.
    //그렇기 때문에 useEffect를 사용하여 검색값이 바뀔떄마다 바로 적용하게해준다.
    if (searchValue.length > 0) {
      onSearch(searchValue);
    }
  }, [searchValue]);

  const onMoveHompage = () => {
    navigate("/");
  };
  const onMoveMyHomepage = () => {
    navigate(`http://localhost.3000/${userinfo.userid}`);
  };
  const onImageChange = (e) => {
    e.preventDefault();
  };
  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onSearchToggle = () => {
    setSearchToggle(!searchToggle);
  };

  return userinfo.userid === user.userid ? (
    <div
      className="Topbar"
      onClick={() => {
        if (searchToggle) {
          setSearchToggle(false);
          setSearchedList("");
        }
      }}
    >
      <div className="navbar bg-base-100 Topbar_logo">
        <div className="flex-1">
          <a
            href={`http://localhost:3000/${userinfo.userid}`}
            className="btn btn-ghost normal-case text-xl"
          >
            instagram
          </a>
        </div>
        <div className="flex-none gap-5">
          <div className="search relative">
            <input
              type="text"
              placeholder="검색"
              onChange={onSearchChange}
              value={searchValue}
              onClick={() => {
                setSearchToggle(true);
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  onSearch(searchValue);
                }
              }}
            />
            <button>
              <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
            </button>
            {searchToggle && (
              <div className="searchBox">
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bolder",
                  }}
                >
                  검색 항목
                </span>
                <button
                  onClick={() => {
                    onSearchToggle();
                  }}
                  className="searchBoxButton"
                >
                  <FaWindowClose
                    style={{
                      position: "absolute",
                      right: "2",
                      top: "2",
                      fontSize: "1.5rem",
                    }}
                  />
                </button>
                {searchedList != "" && searchValue != "" ? (
                  <div className="searchedBox flex mt-2 ml-1">
                    {searchedList.map((searched, id) => (
                      <li key={id}>
                        <div className="flex gap-1">
                          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-1">
                            <a href="#">
                              <img
                                src={
                                  searched.userimgSrc != null
                                    ? searched.userimgSrc
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                                }
                              />
                            </a>
                          </div>
                          <div>
                            <div className="searchedName">
                              <span>
                                <a
                                  href={`http://localhost:3000/${searched.userid}`}
                                >
                                  {searched.username}
                                </a>
                              </span>
                            </div>
                            <div className="searchedId">
                              <a
                                href={`http://localhost:3000/${searched.userid}`}
                              >
                                <span>{searched.userid}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center align-center">
                    <span>검색 결과 없음</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <button>
            <FaHome style={{ fontSize: "25px" }} />
          </button>
          <button>
            <FaRegComment style={{ fontSize: "25px" }} />
          </button>
          <button
            onClick={() => {
              onAddImageToggle();
            }}
          >
            <FaPlusSquare style={{ fontSize: "25px" }} />
          </button>

          <button
            onClick={() => {
              if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                setUser("");
                sessionStorage.clear();
                setLogined(!logined);
                onMoveHompage();
              }
            }}
          >
            <a href="#">Logout</a>
          </button>

          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.userimgSrc == undefined
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                      : user.userimgSrc
                  }
                  alt=""
                  onChange={onImageChange}
                />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href={`http://localhost:3000/${userinfo.userid}`}
                  className="justify-between"
                >
                  프로필
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>저장됨</a>
              </li>
              <li>
                <a>설정</a>
              </li>
              <li>
                <a>계정 변환</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className="Topbar"
      onClick={() => {
        if (searchToggle) {
          setSearchToggle(false);
          setSearchedList("");
        }
      }}
    >
      <div className="navbar bg-base-100 Topbar_logo">
        <div className="flex-1">
          <a
            href={`http://localhost:3000/${userinfo.userid}`}
            className="btn btn-ghost normal-case text-xl"
          >
            instagram
          </a>
        </div>
        <div className="flex-none gap-5">
          <div className="search relative">
            <input
              type="text"
              placeholder="검색"
              onChange={onSearchChange}
              value={searchValue}
              onClick={() => {
                setSearchToggle(true);
              }}
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  onSearch(searchValue);
                }
              }}
            />
            <button>
              <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
            </button>
            {searchToggle && (
              <div className="searchBox">
                <span
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "bolder",
                  }}
                >
                  검색 항목
                </span>
                <button
                  onClick={() => {
                    onSearchToggle();
                  }}
                  className="searchBoxButton"
                >
                  <FaWindowClose
                    style={{
                      position: "absolute",
                      right: "2",
                      top: "2",
                      fontSize: "1.5rem",
                    }}
                  />
                </button>
                {searchedList != "" ? (
                  <div className="searchedBox flex mt-2 ml-1">
                    {searchedList.map((searched, id) => (
                      <li key={id}>
                        <div className="flex gap-1">
                          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-1">
                            <a href="#">
                              <img
                                src={
                                  searched.userimgSrc != null
                                    ? searched.userimgSrc
                                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                                }
                              />
                            </a>
                          </div>
                          <div>
                            <div className="searchedName">
                              <span>
                                <a href={searched.userid}>
                                  {searched.username}
                                </a>
                              </span>
                            </div>
                            <div className="searchedId">
                              <a href={searched.userid}>
                                <span>{searched.userid}</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center align-center">
                    <span>검색 결과 없음</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <button>
            <FaHome style={{ fontSize: "25px" }} />
          </button>
          <button>
            <FaRegComment style={{ fontSize: "25px" }} />
          </button>
          <button>
            <FaPlusSquare style={{ fontSize: "25px" }} />
          </button>

          <button
            onClick={() => {
              if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                setUser("");
                sessionStorage.clear();
                setLogined(!logined);
                onMoveHompage();
              }
            }}
          >
            <a href="#">Logout</a>
          </button>

          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    userinfo.userimgSrc == undefined
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                      : userinfo.userimgSrc
                  }
                  alt=""
                  onChange={onImageChange}
                />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href={`http://localhost:3000/${userinfo.userid}`}
                  className="justify-between"
                >
                  프로필
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>저장됨</a>
              </li>
              <li>
                <a>설정</a>
              </li>
              <li>
                <a>계정 변환</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginedHead;
