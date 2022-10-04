import { useState, useEffect } from "react";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
const GridEdit = ({ setEditToggle, userid }) => {
  const [editImg, setEditImg] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getImage/${userid}`,
          method: "GET",
        });
        setEditImg(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);
  const [editChangeToggle, setEditChangeToggle] = useState(false);
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
  const onEditToggle = () => {
    setEditChangeToggle(!editChangeToggle);
  };
  const onTextChange = (e) => {
    setTextValue(e.target.value);
  };
  const onChange = (e) => {
    setContent(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (content == null || content == "") {
      return;
    }
    const formData = new FormData();
    formData.append("img", content);
    formData.append("text", textValue);
    //append : 개체 FormData내부의 기존 키에 새 값을 FormData추가
    //참고사이트 : https://developer.mozilla.org/en-US/docs/Web/API/FormData/append
    const userid = JSON.parse(sessionStorage.getItem("user")).userid;

    axios({
      // url 새로 업데이트쿼리로 짜야함.
      url: `http://localhost:3002/upload/${userid}`,
      method: "POST",
      data: formData,
    })
      //textValue
      .then((res) => {
        const { fileName } = res.data;
        setUploadedImg({ fileName });
      })
      .catch((err) => {
        console.error(err);
      });

    // try {
    //   const data = await axios.get(`http://localhost:3002/getImage/${userid}`);

    //   alert("업로드 완료");
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.7)",
          position: "absolute",
          width: "100vw",
          height: "92vh",
          zIndex: "9998",
        }}
      >
        <div
          style={{
            width: "450px",
            height: "500px",
            marginTop: "100px",
            margin: "0 auto",
            transform: "translate(-50%,30%)",
          }}
        >
          <button
            onClick={() => {
              onEditToggle();
            }}
          >
            <img src={editImg.imgSrc} alt="" />
          </button>
        </div>
        {editChangeToggle && (
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
                <div>
                  <button
                    onClick={() => {
                      onEditToggle();
                    }}
                  >
                    <FaWindowClose
                      style={{
                        position: "absolute",
                        right: "2",
                        top: "2",
                        fontSize: "1.5rem",
                      }}
                    />
                  </button>
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
                    placeholder={editImg.body}
                  />
                </div>
                <div className="flex justify-center mt-5 mb-5">
                  <input type="submit" value="수정하기" className="btn" />
                </div>
              </form>
            </div>
          </div>
        )}
        {/* 사진 오른쪽 body출력해야함. */}
        <button
          style={{
            zIndex: "9999",
            position: "absolute",
            top: "2%",
            right: "2%",
          }}
          onClick={() => {
            setEditToggle(false);
          }}
        >
          <FaWindowClose
            style={{
              position: "absolute",
              right: "2",
              top: "2",
              fontSize: "1.5rem",
              color: "black",
              cursor: "pointer",
              color: "white",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default GridEdit;
