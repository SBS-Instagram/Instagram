import { useEffect } from "react";
import { useState } from "react";
import LoginedHead from "./LoginedHead";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import { FiSmile, FiBookmark } from "react-icons/fi";
import { BsFillBookmarkFill } from "react-icons/bs";
const Main = ({
  onLoginToggle,
  setLoginToggle,
  logined,
  setLogined,
  user,
  setUser,
  onSearch,
  setAddImageToggle,
  onAddImageToggle,
  searchedList,
  setSearchedList,
  onLike,
}) => {
  const [reply, setReply] = useState("");
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const [empty, setEmpty] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFollowArticle/${userinfo.userid}`,
          method: "GET",
        });

        if (data.data != false) {
          setArticles(data.data.reverse());
        } else {
          setEmpty(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDatas();

    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFollowMember/${userinfo.userid}`,
          method: "GET",
        });
        setUsers(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFollowArticle/${userinfo.userid}`,
          method: "GET",
        });

        if (data.data != false) {
          setArticles(data.data.reverse());
        } else {
          setEmpty(true);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getDatas();
  }, [articles]);

  const onSave = async (userid, articleid) => {
    try {
      const data = await axios({
        url: `http://localhost:3002/articleSave?userid=${userid}&articleid=${articleid}`,
        method: "GET",
      });
      if (data.data) {
        window.alert("게시글이 저장되었습니다.");
      } else {
        window.alert("게시글 저장이 취소되었습니다.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <LoginedHead
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
      />
      <div
        style={{
          width: "600px",
          height: "90px",
          margin: "0 auto",
          outline: "1px rgb(209, 209, 209) solid",
          borderRadius: "15px",
          marginTop: "2rem",
        }}
      >
        <div
          style={{
            height: "100%",
          }}
        >
          <ul
            className="flex flex-row gap-6 justify-center items-center pt-2"
            style={{
              height: "100%",
              maxWidth: "800px",
              overflow: "hidden",
            }}
          >
            {users.map((user, index) => (
              <li key={index}>
                <div style={{}}>
                  <div
                    className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-box"
                    style={{ height: "50px" }}
                  >
                    <a href={`/${user.userid}`}>
                      {user.userimgSrc != null ? (
                        <img
                          src={user.userimgSrc}
                          style={{
                            borderRadius: "50%",
                            width: "100%",
                            height: "100%",
                            display: "block",
                            objectFit: "fill",
                          }}
                        />
                      ) : (
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                          alt=""
                          style={{
                            borderRadius: "50%",
                            width: "100%",
                            height: "100%",
                            display: "block",
                            objectFit: "fill",
                          }}
                        />
                      )}
                    </a>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "3px",
                    }}
                  >
                    <a href={`/${user.userid}`}>{user.username}</a>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <div
              style={{
                width: "500px",
                height: "720px",
                margin: "0 auto",
                outline: "1px rgb(209, 209, 209) solid",
                borderRadius: "15px",
                marginTop: "2rem",
              }}
            >
              <div className="pl-3 pt-3 relative pb-3">
                <div
                  className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-box"
                  style={{
                    height: "50px",
                  }}
                >
                  <a href={`/${article.userid}`}>
                    {article.userimgSrc != null ? (
                      <img
                        src={article.userimgSrc}
                        style={{
                          borderRadius: "50%",
                          width: "100%",
                          height: "99%",
                          objectFit: "fill",
                          display: "block",
                        }}
                      />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                        alt=""
                        style={{
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </a>
                </div>
                <div
                  style={{
                    left: "15%",
                    top: "35%",
                    position: "absolute",
                  }}
                >
                  <a href={`/${article.userid}`}>{article.username}</a>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "450px",
                  margin: "0 auto",
                }}
              >
                <a href={`/${article.userid}/${article.id}`}>
                  <img
                    src={article.imgSrc}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      display: "block",
                    }}
                  />
                </a>
              </div>
              <div className="flex flex-raw mt-3 ml-1 relative">
                <button
                  onClick={() => {
                    onLike(article.id, userinfo.userid, userinfo.userimgSrc);
                  }}
                >
                  {article.likeid == userinfo.userid && article.liked == "1" ? (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="icon"
                      style={{
                        color: "pink",
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="icon"
                      style={{
                        color: "gray",
                      }}
                    />
                  )}
                </button>
                <div
                  style={{
                    paddingLeft: "5px",
                  }}
                >
                  <span> 좋아요 {article.imgLike}</span>
                </div>

                <div className="ml-4 ">
                  <FontAwesomeIcon icon={faCommentDots} className="icon" />
                  <span> 댓글 {article.imgReply}</span>
                </div>
                {article.saved == 1 ? (
                  <button
                    onClick={() => {
                      onSave(userinfo.userid, article.articleid);
                    }}
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <BsFillBookmarkFill
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        right: "3.5%",
                        top: "7%",
                        fontSize: "1.1rem",
                      }}
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onSave(userinfo.userid, article.articleid);
                    }}
                    style={{
                      display: "inline-block",
                    }}
                  >
                    <FiBookmark
                      style={{
                        display: "inline-block",
                        position: "absolute",
                        right: "3%",
                        top: "2%",
                        fontSize: "1.4rem",
                      }}
                    />
                  </button>
                )}
              </div>
              <div
                style={{
                  display: "inline-block",
                  paddingLeft: "7px",
                  fontWeight: "bolder",
                }}
              >
                <a href={`/${article.userid}`}>{article.userid}</a>
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                  paddingTop: "10px",
                  height: "80px",
                  display: "inline-block",
                }}
              >
                {article.body}
              </div>
              <div
                style={{
                  paddingLeft: "10px",
                  paddingBottom: "10px",
                  color: "rgb(189, 189, 189)",
                }}
              >
                댓글 {article.imgReply} 개
              </div>
              <div
                style={{
                  width: "100%",
                  borderBottom: ".5px solid rgb(209, 209, 209)",
                  paddingTop: "2px",
                }}
              ></div>
              <div
                className="flex items-center pl-2"
                style={{
                  height: "40px",
                }}
              >
                <a
                  href={`/${article.userid}/${article.articleid}`}
                  style={{
                    left: "2%",
                    fontSize: "1rem",
                    color: "rgb(189, 189, 189)",
                  }}
                >
                  <FiSmile
                    style={{
                      display: "inline-block",
                      fontSize: "1.3rem",
                      marginRight: "5px",
                      color: "black",
                    }}
                  />
                  댓글 달기...
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
