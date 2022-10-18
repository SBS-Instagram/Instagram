import { useEffect } from "react";
import { useState } from "react";
import LoginedHead from "./LoginedHead";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
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
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const [empty, setEmpty] = useState(false);
  const [like, setLike] = useState(false);
  useEffect(() => {
    const getDatas = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFollowArticle/${userinfo.userid}`,
          method: "GET",
        });
        if (data.data != false) {
          setArticles(data.data);
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
          height: "120px",
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
            className="flex flex-row gap-6 justify-center items-center"
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
                    style={{}}
                  >
                    <a href={`/${user.userid}`}>
                      {user.userimgSrc != null ? (
                        <img
                          src={user.userimgSrc}
                          style={{
                            borderRadius: "50%",
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
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "5px",
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
                height: "700px",
                margin: "0 auto",
                outline: "1px rgb(209, 209, 209) solid",
                borderRadius: "15px",
                marginTop: "2rem",
              }}
            >
              <div className="pl-3 pt-3">
                <div
                  className="w-14  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-box"
                  style={{
                    height: "58px",
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
                    paddingTop: "5px",
                    paddingBottom: "5px",
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
              </div>
              <div className="flex flex-raw mt-3">
                <button
                  onClick={() => {
                    onLike(article.id, userinfo.userid, article.userimgSrc);
                    console.log("좋아요");
                  }}
                  style={{
                    border: "1px red solid",
                    color: "black",
                  }}
                >
                  {like ? (
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
                        color: "rgba(255,255,255,0.9)",
                      }}
                    />
                  )}
                </button>
                <span>{article.imgLike}</span>

                <div className="ml-4">
                  <FontAwesomeIcon icon={faCommentDots} className="icon" />
                  <span> 댓글 {article.imgReply}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
