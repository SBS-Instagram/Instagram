import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Image.css";
const BASE_URL = "http://localhost:3002";

const Image = ({ images, setImages, logined, setLogined, user }) => {
  const [content, setContent] = useState("");
  const [textValue, setTextValue] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: "",
  });

  const fileAdd = () => {
    let file = document.getElementById("fileAdd");
    file.click();
  };
  const onTextChange = (e) => {
    setTextValue(e.target.value);
  };
  const onChange = (e) => {
    setContent(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (content == null || content == "") {
      return;
    }
    const formData = new FormData();
    formData.append("img", content);
    const userid = JSON.parse(sessionStorage.getItem("user")).userid;

    axios
      .post(`http://localhost:3002/upload/${userid}`, formData)
      //textValue
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
          <div className="flex justify-center">
            <textarea
              className="textBox"
              style={{
                width: "300px",
                height: "500px",
                whiteSpace: "wrap",
              }}
              type="text"
              onChange={onTextChange}
              value={textValue}
              placeholder="게시글을 입력해 주세요"
            />
          </div>
          <div className="flex justify-center mt-5 mb-5">
            <input type="submit" value="업로드하기" className="btn" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Image;
// 문제점 1.이미지를 업로드 해도 02.jpg처럼 파일명이 그대로남아있음.
