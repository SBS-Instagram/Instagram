import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import UnLoginedGrid from "../components/UnLoginedGrid";
import Image from "../components/Image";
import axios from "axios";
import Login from "../components/Login";
import LoginedHead from "../components/LoginedHead";
import UnLoginedHead from "../components/UnLoginedHead";
import LoginedProfile from "../components/LoginedProfile";
import UnLoginedProfile from "../components/UnLoginedProfile";
import Layout from "../layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../layouts/Footer";
const UnLoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
  onSearch,
  user,
  setUser,
}) => {
  const { userid } = useParams();

  return (
    <div>
      <UnLoginedHead
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
        onSearch={onSearch}
      />
      <Layout>
        <UnLoginedProfile
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
      <UnLoginedGrid
        logined={logined}
        setLogined={setLogined}
        user={user}
        userid={userid}
      />
      <Footer />
    </div>
  );
};

export default UnLoginedHome;
