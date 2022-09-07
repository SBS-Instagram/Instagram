import React from "react";
import Login from "../components/Login";
import "../styles/Welcome.css";
const Welcome = ({ onLogin, logined, setLogined }) => {
  return (
    <div className="welcome">
      <div className="img-box">
        <img
          src="https://cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/MZPCOPSXUITEAYPH2CZ53TWYLE.png"
          alt=""
        />
        <Login onLogin={onLogin} logined={logined} setLogined={setLogined} />
      </div>
    </div>
  );
};

export default Welcome;
