import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Image.css";
const BASE_URL = "http://localhost:3002";

const Image = ({ images, setImages, logined, setLogined, user }) => {
  const [content, setContent] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: "",
  });

  const fileAdd = () => {
    let file = document.getElementById("fileAdd");
    file.click();
  };

  const onChange = (e) => {
    setContent(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("img", content);
    const userid = user.userid;
    axios
      .post(`http://localhost:3002/upload/${userid}`, formData)
      .then((res) => {
        const { fileName } = res.data;
        setUploadedImg({ fileName });
        alert("업로드 완료");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="relative mx-auto imgcon">
      <div className="formbox ">
        <form
          onSubmit={onSubmit}
          style={{
            display: "inline-block",
          }}
        >
          <div id="uploadDiv">
            <input
              id="fileAdd"
              type="file"
              onChange={onChange}
              style={{
                cursor: "pointer",
              }}
            />
          </div>
          <input
            type="submit"
            value="업로드하기"
            className="btn"
            onClick={() => {}}
          />
        </form>
      </div>
    </div>
  );
};
export default Image;
// 문제점 1.이미지를 업로드 해도 02.jpg처럼 파일명이 그대로남아있음.
