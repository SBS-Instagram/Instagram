import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWindowClose } from "react-icons/fa";
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Grid = ({
  logined,
  setLogined,
  user,
  userid,
  onRemove,
  onLike,
  deleteToggle,
  onDeleteToggle,
  setDeleteToggle,
  menuToggle,
  setMenuToggle,
  onMenuToggle,
}) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState([]);
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const windowY = window.scrollY;
  const [parsedDate, setParsedDate] = useState([]);
  const navigate = useNavigate();
  const id = selectedImage.id || "";

  const onMoveHompage = () => {
    navigate(`/${user.userid}/${id}`);
  };

  // 로그인 후 user가 렌더링되면 사진들 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFiles/${userid}`,
          method: "POST",
        });
        setImages(data.data.reverse());
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, []);

  // 이미지 업로드 후 ( => 이미지 배열에 변동이 생기면) 리렌더링.
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFiles/${userid}`,
          method: "POST",
        });
        setImages(data.data.reverse());
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, []); // => [images] 이미지 배열이 바뀌면, 리렌더링. 업로드후 바로 사진갱신됨

  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  // 9.22 좋아요 테이블 추가
  // CREATE TABLE like_table(
  //   id INT,
  //   likeid VARCHAR(30),
  //   liked INT,
  //   imgSrc VARCHAR(255)
  //   );

  return (
    <div>
      {userinfo.userid === user.userid ? (
        <div onClick={() => {}}>
          <section className="mx-auto con section-2 relative">
            <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
              {images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedImage(image);

                    onMoveHompage();
                    // onDeleteToggle();
                  }}
                >
                  <div>
                    <img src={image.imgSrc} />
                    <div>
                      <FontAwesomeIcon icon={faHeart} className="icon" />
                      <span>{image.imgLike}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCommentDots} className="icon" />
                      <span>{image.imgReply}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="fixed bg-blue-200 topbtn"
              style={{
                width: "150px",
                height: "40px",
                left: "2%",
                bottom: "2%",
                borderRadius: "15px",
                padding: "10px",
                color: "gray",
              }}
              onClick={() => {
                if (!window.scrollY) return;
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              {" "}
              위로 가기
            </button>
          </section>
          <div></div>
        </div>
      ) : (
        <div>
          <section className="mx-auto con section-2 relative">
            <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
              {images.map((image, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedImage(image);
                    onMoveHompage();
                  }}
                >
                  <div>
                    <img src={image.imgSrc} />
                    <div>
                      <FontAwesomeIcon icon={faHeart} className="icon" />
                      <span>{image.imgLike}</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faCommentDots} className="icon" />
                      <span>{image.imgReply}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="fixed bg-blue-200 topbtn"
              style={{
                width: "150px",
                height: "40px",
                left: "2%",
                bottom: "2%",
                borderRadius: "15px",
                padding: "10px",
                color: "gray",
              }}
              onClick={() => {
                if (!window.scrollY) return;
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              {" "}
              위로 가기
            </button>
          </section>
        </div>
      )}
    </div>
  );
};
export default Grid;
