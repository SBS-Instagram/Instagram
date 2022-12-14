import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import Grid from "../components/Grid";
import Image from "../components/Image";
import About from "../routes/About";
import axios from "axios";
import Login from "../components/Login";
import LoginedHead from "../components/LoginedHead";
import LoginedProfile from "../components/LoginedProfile";
import Layout from "../layouts/Layout";
import Footer from "../layouts/Footer";

import { useNavigate, useParams } from "react-router-dom";

const LoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  logined,
  setLogined,
  setUser,
  onSearch,
  loginToggle,
  setAddImageToggle,
  onAddImageToggle,
  searchedList,
  setSearchedList,
  onLogin,
  user,
  addImageToggle,
  onFollow,
  onRemove,
  onFollowCheck,
  isFollowed,
  setIsFollowed,
  onLike,
  setImages,
}) => {
  useEffect(() => {
    setLoginToggle(false);
  }, []);

  useEffect(() => {
    setAddImageToggle(false);
  }, []);
  const { userid } = useParams();
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
          onFollow={onFollow}
          onRemove={onRemove}
          onFollowCheck={onFollowCheck}
          isFollowed={isFollowed}
          setIsFollowed={setIsFollowed}
        />
      </Layout>
      {loginToggle && (
        <Login
          onLoginToggle={onLoginToggle}
          setLoginToggle={setLoginToggle}
          onLogin={onLogin}
          logined={logined}
          setLogined={setLogined}
        />
      )}
      <Grid
        logined={logined}
        setLogined={setLogined}
        user={user}
        userid={userid}
        onRemove={onRemove}
        onLike={onLike}
      />
      <Footer />
    </div>
  );
};

export default LoginedHome;
