import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import Grid from "../components/Grid";
import Image from "../components/Image";
import axios from "axios";
import Login from "../components/Login";
import LoginedHead from "../components/LoginedHead";
import LoginedProfile from "../components/LoginedProfile";
import Layout from "../layouts/Layout";
import Footer from "../layouts/Footer";

const LoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
  user,
  setUser,
  onSearch,
  onAddImageToggle,
  addImageToggle,
  setAddImageToggle,
  searchedList,
}) => {
  useEffect(() => {
    setLoginToggle(false);
  }, []);

  useEffect(() => {
    setAddImageToggle(false);
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
      />
      {addImageToggle && (
        <Image logined={logined} setLogined={setLogined} user={user} />
      )}
      <Layout>
        <LoginedProfile
          logined={logined}
          setLogined={setLogined}
          user={user}
          setUser={setUser}
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
      <Grid logined={logined} setLogined={setLogined} user={user} />
      <Footer />
    </div>
  );
};

export default LoginedHome;
