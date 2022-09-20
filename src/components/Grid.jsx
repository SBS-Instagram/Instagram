import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";

const Grid = ({ logined, setLogined, user, userid, onRemove }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [detailToggle, setDetailToggle] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);

  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const windowY = window.scrollY;

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
  }, [user]);

  // 이미지 업로드 후 ( => 이미지 배열에 변동이 생기면) 리렌더링.
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFiles/${user.userid}`,
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
  }, [images]); // => [images] 이미지 배열이 바뀌면, 리렌더링. 업로드후 바로 사진갱신됨

  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }

  const onDeleteToggle = () => {
    setDeleteToggle(!deleteToggle);
  };

  const onDetailToggle = () => {
    setDetailToggle(!detailToggle);
  };
  return userinfo.userid === user.userid ? (
    <div
      onClick={() => {
        if (detailToggle) setDetailToggle(false);
      }}
    >
      <section className="mx-auto con section-2 relative">
        {detailToggle && (
          <div className="">
            <div
              className="articleDetail"
              style={{ marginTop: `${windowY - 450}px` }}
            >
              <button
                onClick={() => {
                  onDetailToggle();
                }}
              ></button>

              <div className="imgBox">
                <img src={selectedImage.imgSrc} alt="" />
              </div>
              <div className="flex flex-raw mt-3">
                <div>
                  <FontAwesomeIcon icon={faHeart} className="icon" />
                  <span> 좋아요 {selectedImage.imgLike}</span>
                </div>
                <div className="ml-4">
                  <FontAwesomeIcon icon={faCommentDots} className="icon" />
                  <span> 댓글 {selectedImage.imgReply}</span>
                </div>
              </div>
              <div className="replyBox flex">
                <FaWindowClose
                  style={{
                    position: "absolute",
                    right: "2",
                    top: "2",
                    fontSize: "1.5rem",
                    color: "black",
                    cursor: "pointer",
                  }}
                />
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-2">
                  <a href={user.userid}>
                    <img src={user.imgSrc} alt="" />
                  </a>
                </div>

                <div className="replyUserBox mt-4">
                  <div>
                    <a href={user.userid}>
                      <span>{user.userid}</span>
                    </a>
                  </div>
                  <div
                    style={{
                      borderBottom: "2px gray solid",
                      marginTop: "35px",
                      marginLeft: "-65px",
                      width: "532px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {deleteToggle && (
          <div className="bg-base-100 shadow-xl deleteBox">
            <div className="card-body">
              <h2 className="card-title">
                해당 게시물을 정말 삭제하시겠습니까?
              </h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    onRemove(selectedImage.id);
                    onDeleteToggle();
                  }}
                >
                  네
                </button>
              </div>
            </div>
          </div>
        )}
        <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          {images.map((image, index) => (
            <li
              key={index}
              onClick={() => {
                setSelectedImage(image);

                onDetailToggle();
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

                onDetailToggle();
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
    </div>
  );
};
export default Grid;
