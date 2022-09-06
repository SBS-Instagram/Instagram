import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Loginedprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";

function LoginedProfile({ logined, setLogined, user }) {
  const [content, setContent] = useState("");
  const [imageToggle, setImageToggle] = useState(false);
  const [profileImageToggle, setProfileImageToggle] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: "",
  });
  const onProfileToggle = () => {
    setProfileImageToggle(!profileImageToggle);
  };
  // ALTER TABLE insta ADD COLUMN imgSrc VARCHAR(255);
  // 위 쿼리는 insta 테이블, 하단 쿼리는 img_table 테이블.
  // CREATE TABLE img_table (
  //   id VARCHAR(100) PRIMARY KEY,
  //   imgSrc VARCHAR(255),
  //   imgLike INT DEFAULT 0,
  //   imgReply INT DEFAULT 0
  //   );
  const onImageToggle = () => {
    setImageToggle(!imageToggle);
  };
  const fileAdd = () => {
    let file = document.getElementById("fileAdd");
    file.click();
  };

  const onChange = (e) => {
    setContent(e.target.files[0]);
  };
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgSrc(reader.result);
        resolve();
      };
    });
  };

  const onImageChange = (e) => {
    e.preventDefault();
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
        onProfileToggle();

        //수정은 되나 초기 로그인 사진이 이상함.
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex-col flex  h-128 Profiles relative">
      <div className="flex h-3/5 ">
        {imageToggle && (
          <form
            onSubmit={onSubmit}
            style={{
              display: "inline-block",
              position: "absolute",
              top: "-7%",
            }}
          >
            <div id="uploadDiv">
              <input
                id="fileAdd"
                type="file"
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
                }}
                style={{
                  cursor: "pointer",
                }}
              />
            </div>
            <input type="submit" value="Upload" className="btn" />
          </form>
        )}
        <div className="flex justify-center items-center w-1/3 ">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-box">
              <button
                className="addImage"
                onClick={() => {
                  onImageToggle();
                }}
              >
                <a href="#">
                  {/* <img
                    src={`${process.env.PUBLIC_URL}/public_assets?logo512.PNG`}
                  /> */}
                  <img
                    src={
                      imgSrc == ""
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                        : imgSrc
                    }
                    alt=""
                    onChange={onImageChange}
                  />
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 ">
          <div className="flex justify-end items-center h-2/5">
            <div className="text-2xl font-light mr-auto mt-2">
              {user.username}님
            </div>
            <button className="rounded-md border-gray-400 bg-white text-black hover:bg-white text-black hover:rounded-md hover:border-gray-400 btn btn-sm mt-2 mr-4">
              메시지 보내기
            </button>
            <button className="rounded-md border-gray-400 bg-white text-black hover:bg-white text-black hover:rounded-md hover:border-gray-400 btn btn-sm mt-2 mr-4">
              팔로우
            </button>
            <button className="mr-auto flex justify mt-4">
              <i className="fi fi-bs-menu-dots"></i>
            </button>
          </div>

          <div className="h-1/5">
            <div className=" h-16 whitespace-nowrap">
              <a href="" className="mr-20">
                게시물
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  0
                </span>
              </a>

              <a href="" className="mr-20">
                팔로워
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  0
                </span>
              </a>
              <a href="" className="mr-20">
                팔로우
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
          <div className="h-2/5">
            <div className=" font-bold m-0 py-1">풀스택 A조</div>
            <div className=" py-1">instagram</div>
            <div className="font-bold text-blue-900 mt-1">
              <a href="https://github.com/hyelim3">github.com/hyelim3</a>
            </div>
          </div>
        </div>
      </div>
      {profileImageToggle && (
        <div>
          <div className="changeProfileImage gap-3">
            <span>프로필 사진이 변경되었습니다.</span>
            <a
              href="#"
              onClick={() => {
                onProfileToggle();
                onImageToggle();
              }}
            >
              {" "}
              <span>확인</span>
            </a>
          </div>
        </div>
      )}
      <div className="flex justify-around items-center h-1/5 stories">
        <div className="avatar ">
          <div className=" relative w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <div className="addHilight">
                <FontAwesomeIcon icon={faPlus} />
              </div>
            </a>
          </div>
        </div>
        <span className="addHilightSpan"> 하이라이트 추가</span>
        <div className="avatar">
          <div className="w-20 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/1043/5184/3456.jpg?hmac=wsz2e0aFKEI0ij7mauIr2nFz2pzC8xNlgDHWHYi9qbc" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className=" w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/1060/5598/3732.jpg?hmac=31kU0jp5ejnPTdEt-8tAXU5sE-buU-y1W1qk_BsiUC8" />
            </a>
          </div>
        </div>
        <div className="avatar">
          <div className=" w-20 rounded-full ring ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/164/1200/800.jpg?hmac=wkqGUkaeW3kiAsHq_VwxSWWossIMAwFV4eUfFzuDkew" />
            </a>
          </div>
        </div>

        <div className="avatar">
          <div className="  mr-16 w-20 rounded-full ring  ring-offset-base-100 ring-offset-2">
            <a href="">
              <img src="https://i.picsum.photos/id/120/4928/3264.jpg?hmac=i-8mkfKj_gRyQt9ZJVhbIBXbtIBNcsbI_gwNe_39vus" />
            </a>
          </div>
        </div>
      </div>
      <div className="tabs flex justify-center mt-9">
        <a className="tab tab-bordered tab-active">게시글</a>
        <a className="tab tab-bordered ">태그 됨</a>
      </div>
    </div>
  );
}

export default LoginedProfile;
