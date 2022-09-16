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
import { useNavigate, useParams } from "react-router-dom";
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
  setSearchedList,
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
        <Image logined={logined} setLogined={setLogined} user={user} />
      )}
      <Layout>
        <LoginedProfile
          logined={logined}
          setLogined={setLogined}
          user={user}
          setUser={setUser}
          userid={userid}
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
      />
      <Footer />
    </div>
  );
};

export default LoginedHome;
