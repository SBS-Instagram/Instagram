import React from "react";
import Footer from "../layouts/Footer";
import LoginedHead from "./LoginedHead";
import LoginedProfile from "./LoginedProfile";
import Layout from "../layouts/Layout";
import Image from "./Image";
import { useParams } from "react-router-dom";

const Saved = ({
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
  setImages,
  addImageToggle,

  onRemove,
  onFollowCheck,
  isFollowed,
  setIsFollowed,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const userid = userinfo.userid;

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

      {addImageToggle && (
        <Image
          logined={logined}
          setLogined={setLogined}
          user={user}
          onAddImageToggle={onAddImageToggle}
          setImages={setImages}
        />
      )}
      <Layout>
        <LoginedProfile
          logined={logined}
          setLogined={setLogined}
          user={user}
          setUser={setUser}
          userid={userid}
          onRemove={onRemove}
          onFollowCheck={onFollowCheck}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
        />
      </Layout>

      <Footer />
    </div>
  );
};

export default Saved;
