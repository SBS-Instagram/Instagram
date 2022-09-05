import React from "react";
import Header from "../layouts/Header";
import { useRecoilValue } from "recoil";
import { authenticatedState } from "../recoil/auth";
import Grid from "../components/Grid";
import Image from "../components/Image";
import axios from "axios";
import Login from "../components/Login";
import Head from "../components/Head";
import Profile from "../components/Profile";
import Layout from "../layouts/Layout";

const Home = ({
  onLoginToggle,
  setLoginToggle,
  loginToggle,
  onLogin,
  logined,
  setLogined,
}) => {
  return (
    <div>
      <Head
        onLoginToggle={onLoginToggle}
        setLoginToggle={setLoginToggle}
        logined={logined}
        setLogined={setLogined}
      />
      <Layout>
        <Profile logined={logined} setLogined={setLogined} />
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
      <Image logined={logined} setLogined={setLogined} />
      <Grid logined={logined} setLogined={setLogined} />
    </div>
  );
};

export default Home;
