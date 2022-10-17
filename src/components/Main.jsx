import { useEffect } from "react";
import { useState } from "react";
import LoginedHead from "./LoginedHead";
import axios from "axios";
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
}) => {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFollowMember/${userinfo.userid}`,
          method: "GET",
        });

        console.log(data.data);
        setUsers(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFollowMember/${userinfo.userid}`,
          method: "GET",
        });

        console.log(data.data);
        setArticles(data.data);
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
        <div>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-box"></div>
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
                width: "600px",
                margin: "0 auto",
                outline: "1px rgb(209, 209, 209) solid",
                borderRadius: "15px",
                marginTop: "2rem",
              }}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
