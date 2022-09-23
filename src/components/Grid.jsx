import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWindowClose } from "react-icons/fa";
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import GridDetail from "./GridDetail";
const Grid = ({ logined, setLogined, user, userid, onRemove, onLike }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [detailToggle, setDetailToggle] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false);
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const windowY = window.scrollY;
  const [parsedDate, setParsedDate] = useState([]);
  const navigate = useNavigate();
  const onMoveHompage = () => {
    navigate(`/${user.userid}/${selectedImage.id}`);
  };
  useEffect(() => {
    AOS.init();
  });
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
  }, [images]); // => [images] 이미지 배열이 바뀌면, 리렌더링. 업로드후 바로 사진갱신됨

  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  const onMenuToggle = () => {
    setMenuToggle(!menuToggle);
  };
  const onDeleteToggle = () => {
    setDeleteToggle(!deleteToggle);
  };

  const onDetailToggle = () => {
    setDetailToggle(!detailToggle);
  };

  // 9.22 좋아요 테이블 추가
  // CREATE TABLE like_table(
  //   id INT,
  //   likeid VARCHAR(30),
  //   liked INT,
  //   imgSrc VARCHAR(255)
  //   );

  return userinfo.userid === user.userid ? (
    <div
      onClick={() => {
        if (detailToggle) {
          // setDetailToggle(false);
        }
      }}
    >
      <section className="mx-auto con section-2 relative">
        {detailToggle && (
          <GridDetail
            logined={logined}
            setLogined={setLogined}
            user={user}
            userid={userid}
            onRemove={onRemove}
            onLike={onLike}
            windowY={windowY}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setDetailToggle={setDetailToggle}
            onMenuToggle={onMenuToggle}
            setMenuToggle={setMenuToggle}
            menuToggle={menuToggle}
            parsedDate={parsedDate}
            deleteToggle={deleteToggle}
            onDeleteToggle={onDeleteToggle}
            setDeleteToggle={setDeleteToggle}
            images={images}
          />
        )}
        {/* {detailToggle && (
          <div className="">
            <div
              className="articleDetail"
              style={{ marginTop: `${windowY - 450}px` }}
            >
              <button onClick={() => {}}></button>

              <div className="imgBox">
                <img src={selectedImage.imgSrc} alt="" />
              </div>
              <div className="flex flex-raw mt-3">
                <div style={{ marginLeft: "10px" }}>
                  <FontAwesomeIcon icon={faHeart} className="icon" />
                  <span> 좋아요 {selectedImage.imgLike}</span>
                  
                </div>
                <div className="ml-4">
                  <FontAwesomeIcon icon={faCommentDots} className="icon" />
                  <span> 댓글 {selectedImage.imgReply}</span>
                </div>
              </div>
              <div className="replyBox flex">
                <button
                  onClick={() => {
                    setDetailToggle(false);
                  }}
                >
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
                </button>
                <div>
                  <button
                    onClick={() => {
                      onMenuToggle();
                      setDeleteToggle(false);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faBars}
                      style={{
                        fontSize: "1.2rem",
                        position: "absolute",
                        right: "1%",
                        top: "5%",
                      }}
                    />
                  </button>

                  {menuToggle && (
                    <div
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "5%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                        width: "100px",
                        gap: "10px",
                      }}
                      data-aos="fade-left"
                    >
                      <button>수정</button>
                      <button
                        onClick={() => {
                          onDeleteToggle();
                        }}
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => {
                          onMenuToggle();
                        }}
                      >
                        취소
                      </button>
                    </div>
                  )}
                </div>
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
                      width: "483px",
                    }}
                  ></div>
                  <div style={{ width: "150px", marginLeft: "-30px" }}>
                    <span>
                      {parsedDate[0]}
                      
                    </span>
                  </div>
                  <div
                    style={{
                      width: "400px",
                      height: "350px",
                      marginLeft: "-30px",
                      marginTop: "10px",
                    }}
                  >
                    <span>{selectedImage.body}</span>
                  </div>
                  <div
                    style={{
                      borderBottom: "2px gray solid",
                      marginTop: "35px",
                      marginLeft: "-65px",
                      width: "483px",
                    }}
                  ></div>
                  <button
                    onClick={() => {
                      onLike(
                        selectedImage.id,
                        userinfo.userid,
                        selectedImage.imgSrc
                      );
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} className="icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {deleteToggle && (
          <div
            className="bg-base-100 shadow-xl deleteBox"
            style={{ marginTop: `${windowY - 250}px`, zIndex: "998" }}
          >
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
                    setDetailToggle(false);
                    setMenuToggle(false);
                  }}
                >
                  네
                </button>
              </div>
            </div>
          </div>
        )} */}
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
