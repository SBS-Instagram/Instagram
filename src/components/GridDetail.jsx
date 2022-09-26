import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaWindowClose } from "react-icons/fa";
import { faHeart, faBars } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const GridDetail = ({
  logined,
  setLogined,
  user,
  userid,
  onRemove,
  onLike,
  windowY,
  selectedImage,
  setSelectedImage,
  setDetailToggle,
  onMenuToggle,
  setMenuToggle,
  menuToggle,
  parsedDate,
  deleteToggle,
  onDeleteToggle,
  setDeleteToggle,
  images,
}) => {
  const userinfo = JSON.parse(sessionStorage.getItem("user")) || "";
  const { id } = useParams();
  const navigate = useNavigate();
  const onMoveHomepage = () => {
    navigate(-1);
  };
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await axios({
  //         url: `http://localhost:3002/getImage/${selectedImage.id}`,
  //         method: "POST",
  //       });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getData();
  // }, [images]);
  return (
    <div>
      <span>{id}번 게시물입니다.</span>
      <Link to={-1}>
        <button
        // onClick={() => {
        //   onMoveHomepage();
        // }}
        >
          돌아가기
        </button>
      </Link>
    </div>
    // <div>
    //   (
    //   <div className="">
    //     <div
    //       className="articleDetail"
    //       style={{ marginTop: `${windowY - 450}px` }}
    //     >
    //       <button onClick={() => {}}></button>

    //       <div className="imgBox">
    //         <img src={selectedImage.imgSrc} alt="" />
    //       </div>
    //       <div className="flex flex-raw mt-3">
    //         <div style={{ marginLeft: "10px" }}>
    //           <FontAwesomeIcon icon={faHeart} className="icon" />
    //           <span> 좋아요 {selectedImage.imgLike}</span>
    //           {/* 좋아요 체크해서 흰하트,검은하트 출력해야함 */}
    //           {/* 좋아요 버튼 눌렀을떄 바로 좋아요수가 올라야하는데 */}
    //           {/* 토글상황에서 바로 리렌더링이 되는지 불확실 */}
    //           {/* 안된다면 이미지클릭시 라우터활용해서 다른홈페이지이동 고려해야함 */}
    //         </div>
    //         <div className="ml-4">
    //           <FontAwesomeIcon icon={faCommentDots} className="icon" />
    //           <span> 댓글 {selectedImage.imgReply}</span>
    //         </div>
    //       </div>
    //       <div className="replyBox flex">
    //         <button
    //           onClick={() => {
    //             setDetailToggle(false);
    //           }}
    //         >
    //           <FaWindowClose
    //             style={{
    //               position: "absolute",
    //               right: "2",
    //               top: "2",
    //               fontSize: "1.5rem",
    //               color: "black",
    //               cursor: "pointer",
    //             }}
    //           />
    //         </button>
    //         <div>
    //           <button
    //             onClick={() => {
    //               onMenuToggle();
    //               setDeleteToggle(false);
    //             }}
    //           >
    //             <FontAwesomeIcon
    //               icon={faBars}
    //               style={{
    //                 fontSize: "1.2rem",
    //                 position: "absolute",
    //                 right: "1%",
    //                 top: "5%",
    //               }}
    //             />
    //           </button>

    //           {menuToggle && (
    //             <div
    //               style={{
    //                 position: "absolute",
    //                 right: "5%",
    //                 top: "5%",
    //                 display: "flex",
    //                 flexDirection: "column",
    //                 backgroundColor: "rgba(0, 0, 0, 0.05)",
    //                 width: "100px",
    //                 gap: "10px",
    //               }}
    //               data-aos="fade-left"
    //             >
    //               <button>수정</button>
    //               <button
    //                 onClick={() => {
    //                   onDeleteToggle();
    //                 }}
    //               >
    //                 삭제
    //               </button>
    //               <button
    //                 onClick={() => {
    //                   onMenuToggle();
    //                 }}
    //               >
    //                 취소
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //         <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 img-Box ml-2 mt-2">
    //           <a href={user.userid}>
    //             <img src={user.imgSrc} alt="" />
    //           </a>
    //         </div>
    //         <div className="replyUserBox mt-4">
    //           <div>
    //             <a href={user.userid}>
    //               <span>{user.userid}</span>
    //             </a>
    //           </div>
    //           <div
    //             style={{
    //               borderBottom: "2px gray solid",
    //               marginTop: "35px",
    //               marginLeft: "-65px",
    //               width: "483px",
    //             }}
    //           ></div>
    //           <div
    //             style={{
    //               width: "100px",
    //               height: "30px",
    //               marginLeft: "-30px",

    //               overflow: "hidden",
    //               whiteSpace: "nowrap",
    //             }}
    //           >
    //             <span>{selectedImage.regDate}</span>
    //           </div>
    //           <div
    //             style={{
    //               width: "400px",
    //               height: "350px",
    //               marginLeft: "-30px",
    //               marginTop: "10px",
    //             }}
    //           >
    //             <span>{selectedImage.body}</span>
    //           </div>
    //           <div
    //             style={{
    //               borderBottom: "2px gray solid",
    //               marginTop: "35px",
    //               marginLeft: "-65px",
    //               width: "483px",
    //             }}
    //           ></div>
    //           <button
    //             onClick={() => {
    //               onLike(
    //                 selectedImage.id,
    //                 userinfo.userid,
    //                 selectedImage.imgSrc
    //               );
    //             }}
    //           >
    //             <FontAwesomeIcon icon={faHeart} className="icon" />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   )
    //   {deleteToggle && (
    //     <div
    //       className="bg-base-100 shadow-xl deleteBox"
    //       style={{ marginTop: `${windowY - 250}px`, zIndex: "998" }}
    //     >
    //       <div className="card-body">
    //         <h2 className="card-title">해당 게시물을 정말 삭제하시겠습니까?</h2>
    //         <div className="card-actions justify-end">
    //           <button
    //             className="btn btn-primary"
    //             onClick={async () => {
    //               onRemove(selectedImage.id);
    //               onDeleteToggle();
    //               setDetailToggle(false);
    //               setMenuToggle(false);
    //             }}
    //           >
    //             네
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    //   ;
    // </div>
  );
};

export default GridDetail;
