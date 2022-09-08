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

import axios from "axios";
import { useNavigate } from "react-router-dom";

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
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [imgSrc, setImgSrc] = useState(user.imgSrc);
  const [searchToggle, setSearchToggle] = useState(false);
  const navigate = useNavigate();

  const onMoveHompage = () => {
    navigate("/welcome");
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

  return (
    <div className="Topbar">
      <div className="navbar bg-base-100 Topbar_logo">
        <div className="flex-1">
          <a
            href="http://localhost:3000/"
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
              onSubmit={() => {
                onSearch(searchValue);
              }}
              onClick={() => {
                setSearchToggle(true);
              }}
            />
            <button>
              <img src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png"></img>
            </button>
            {searchToggle && (
              <div className="searchBox">
                <span>최근검색 항목</span>
                <button
                  onClick={() => {
                    onSearchToggle();
                  }}
                  className="searchBoxButton"
                >
                  <FaWindowClose />
                </button>
                <div></div>
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
          {/* onClick={()=>{serch()}} */}
          <button
            onClick={() => {
              if (window.confirm("정말 로그아웃 하시겠습니까?")) {
                setUser("");
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
                    user.imgSrc == undefined
                      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                      : user.imgSrc
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
