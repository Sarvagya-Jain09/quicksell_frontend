import React from "react";
import "./Tag.css";
const Tag = (props) => {
  return (
    <div className="tag" style={{ border: `2px solid ${props?.color}` }}>
      <i className="fa-solid fa-circle fa-2xs"></i>
      {props?.tagName}
    </div>
  );
};

export default Tag;
