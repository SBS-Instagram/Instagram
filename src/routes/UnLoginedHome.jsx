import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import Grid from "../components/Grid";
import Image from "../components/Image";
import axios from "axios";
import Login from "../components/Login";
import LoginedHead from "../components/LoginedHead";
import UnLoginedHead from "../components/UnLoginedHead";
import LoginedProfile from "../components/LoginedProfile";
import UnLoginedProfile from "../components/UnLoginedProfile";
import Layout from "../layouts/Layout";

const UnLoginedHome = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
  onSearch,
}) => {
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
        <UnLoginedProfile logined={logined} setLogined={setLogined} />
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
    </div>
  );
};

export default UnLoginedHome;
