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

const Home = ({ onLoginToggle, setLoginToggle, loginToggle }) => {
  const logined = useRecoilValue(authenticatedState);
  return (
    <div>
      <Head onLoginToggle={onLoginToggle} setLoginToggle={setLoginToggle} />
      <Layout>
        <Profile />
      </Layout>
      {loginToggle && (
        <Login onLoginToggle={onLoginToggle} setLoginToggle={setLoginToggle} />
      )}
      <Image />
      <Grid />
    </div>
  );
};

export default Home;
