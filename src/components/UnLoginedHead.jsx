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
import { useNavigate } from "react-router-dom";
const UnLoginedHead = ({
  setLoginToggle,
  onLoginToggle,
  logined,
  setLogined,
  onSearch,
  user,
  searchedList,
  setSearchedList,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [imgSrc, setImgSrc] = useState(user.imgSrc);
  const [searchToggle, setSearchToggle] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (searchValue.length > 0) {
      onSearch(searchValue);
    }
  }, [searchValue]);

  const onSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  const onSearchToggle = () => {
    setSearchToggle(!searchToggle);
  };
  return (
    <div className="Topbar">
      <div className="navbar bg-base-100 Topbar_logo">
        <div className="flex-1">
          <a
            href="http://localhost:3000/"
            className="btn btn-ghost normal-case text-xl"
          >
            instargram
          </a>
        </div>
        <div className="flex-none gap-5">
          <div className="search">
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
                                  searched.imgSrc != null
                                    ? searched.imgSrc
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
          <a href="#">
            <FaHome style={{ fontSize: "25px" }} />
          </a>
          <a href="#">
            <FaPlusSquare style={{ fontSize: "25px" }} />
          </a>
          <button
            onClick={() => {
              onLoginToggle();
            }}
          >
            <a href="#">Login</a>
          </button>
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU" />
              </div>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href="https://www.instagram.com/anjjaaang/"
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
                <a>계정변환</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnLoginedHead;
