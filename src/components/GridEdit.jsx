import React from "react";
import { FaWindowClose } from "react-icons/fa";
const GridEdit = ({ setEditToggle }) => {
  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0,0.7)",
        position: "absolute",
        width: "100vw",
        height: "92vh",
        zIndex: "9998",
      }}
    >
      <button
        style={{ zIndex: "9999", position: "absolute", top: "2%", right: "2%" }}
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
  );
};

export default GridEdit;
