import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";

const UnLoginedGrid = ({ logined, setLogined, user, userid }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // 로그인 후 user가 렌더링되면 사진들 불러오기
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFiles/${userid}`,
          method: "POST",
        });
        setImages(data.data.reverse());
        setIsLoading(false);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, []);

  // 이미지 업로드 후 ( => 이미지 배열에 변동이 생기면) 리렌더링.

  return (
    <section className="mx-auto con section-2 relative">
      <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
        {images.map((image, index) => (
          <li key={index}>
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
  ); // 9.7 홈페이지에 업로드된 이미지 나열성공, 좋아요 댓글 수 추가해야함
  // 9.8 이미지 정렬, 좋아요, 댓글수 나열 성공.
};

export default UnLoginedGrid;
