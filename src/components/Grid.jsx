import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";

const Grid = ({ logined, setLogined, user }) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: `http://localhost:3002/getFiles/${user.userid}`,
          method: "POST",
        });
        // console.log("data.data", data.data);
        setImages(data.data);
        console.log(data.data);
        // setImages(imgs);
        setIsLoading(false);
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

  // 화면 리디렉션(새로고침)
  // 업로드 눌렀을떄 콜백함수로 API를 다시 작성하고 화면 다시세팅.(많이쓰임)
  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  // CREATE TABLE img_table (
  //   id INT PRIMARY KEY AUTO_INCREMENT,
  //   userid VARCHAR(100),
  //   imgSrc VARCHAR(255),
  //   imgLike INT DEFAULT 0,
  //   imgReply INT DEFAULT 0
  //   );  9.7 수정된 이미지테이블 쿼리

  return (
    <section className="mx-auto con section-2">
      <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
        {images.map((image, index) => (
          <li key={index}>
            <div>
              <img src={image.imgSrc} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  ); // 9.7 홈페이지에 업로드된 이미지 나열성공, 좋아요 댓글 수 추가해야함
  // return (
  //   <div>
  //     <section className="mx-auto con section-2">
  //       <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
  //         <li>
  //           <a href="#">
  //             {/* <img src={images[0].imgSrc} alt="" /> */}
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               {/* <span>{images[0].imgLike}</span> */}
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               {/* <span>{images[0].imgReply}</span> */}
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>{" "}
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>{" "}
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>{" "}
  //         <li>
  //           <a href="#">
  //             <img
  //               src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
  //               alt=""
  //             />
  //             <div>
  //               <FontAwesomeIcon icon={faHeart} className="icon" />
  //               <span>22.5K</span>
  //             </div>
  //             <div>
  //               <FontAwesomeIcon icon={faCommentDots} className="icon" />
  //               <span>2.7K</span>
  //             </div>
  //           </a>
  //         </li>
  //       </ul>
  //     </section>
  //   </div>
  // );
};

export default Grid;
