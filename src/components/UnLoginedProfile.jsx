import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UnLoginedprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import UnLoginedHead from "./UnLoginedHead";
import { useNavigate, useParams } from "react-router-dom";
function UnLoginedProfile({ logined, setLogined, user, setUser, userid }) {
  const [content, setContent] = useState("");
  const [imageToggle, setImageToggle] = useState(false);
  const [profileImageToggle, setProfileImageToggle] = useState(false);
  const [error, setError] = useState(null);
  const [imgSrc, setImgSrc] = useState(user.imgSrc);
  const [uploadedImg, setUploadedImg] = useState({
    fileName: "",
    fillPath: "",
  });

  const navigate = useNavigate();
  const onMoveHompage = () => {
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getMember/${userid}`,
          method: "POST",
        });

        setUser(data.data);

        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, [user]);

  return (
    <div className="flex-col flex  h-128 Profiles relative">
      <div className="flex h-3/5 ">
        <div className="flex justify-center items-center w-1/3 ">
          <div className="avatar">
            <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-box">
              <button className="addImage" onClick={() => {}}>
                <a href="#">
                  <img
                    src={
                      user.imgSrc == undefined
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8odrQguUEk4y0r47v-EpBtqpn-Iw3WiErA&usqp=CAU"
                        : user.imgSrc
                    }
                    alt=""
                  />
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="w-2/3 ">
          <div className="flex justify-end items-center h-2/5">
            <div className="text-2xl font-light mr-auto mt-2">
              {/* {JSON.parse(sessionStorage.getItem("user"))}님 */}
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
                  {user.article}
                </span>
              </a>

              <a href="" className="mr-20">
                팔로워
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.followerNum}
                </span>
              </a>
              <a href="" className="mr-20">
                팔로우
                <span
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {user.followNum}
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
              onClick={async () => {
                try {
                  const data = await axios.post(
                    `http://localhost:3002/getMember/${user.userid}`,
                    {}
                  );

                  sessionStorage.setItem("user", JSON.stringify(data.data));
                  setUser(data.data);
                  setImgSrc(data.data.imgSrc);
                } catch (e) {
                  setError(e);
                }
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

export default UnLoginedProfile;
