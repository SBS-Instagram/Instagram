import React, { useState, useEffect } from "react";
import "../styles/Grid.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Grid = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getImage = async () => {
      try {
        const image = await axios({
          url: "http://localhost:3002/getFiles",
          method: "GET",
        });
        setIsLoading(false);
        setImages(image.data); // -> 객체배열.
        // console.log(image.data[0].imgSrc);
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      } catch (e) {
        setError(e);
      }
    };
    getImage();
  }, []);
  if (error) {
    return <>에러: {error.message}</>;
  }
  if (isLoading) {
    return <>Loading...</>;
  }
  // let a = images[0].imgSrc;
  return (
    <div>
      <section className="mx-auto con section-2">
        <ul className="list-box grid grid-cols-3 gap-2 sm:gap-2 md:gap-3 lg:gap-4">
          <li>
            <a href="#">
              <img src={images[0].imgSrc} alt="" />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>{images[0].imgLike}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>{images[0].imgReply}</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/4085643/pexels-photo-4085643.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13025002/pexels-photo-13025002.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>{" "}
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>{" "}
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>{" "}
          <li>
            <a href="#">
              <img
                src="https://images.pexels.com/photos/13248509/pexels-photo-13248509.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
                alt=""
              />
              <div>
                <FontAwesomeIcon icon={faHeart} className="icon" />
                <span>22.5K</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCommentDots} className="icon" />
                <span>2.7K</span>
              </div>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Grid;
