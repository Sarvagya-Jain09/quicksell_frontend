import React, { useRef, useEffect } from 'react';
import './Dropdown.css'

const Dropdown = (props) => {
  // const dropRef = useRef();
  // const handleClick = (event) => {
  //   if (dropRef && !dropRef.current.contains(event.target) && props.onClose) {
  //     props.onClose()
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener("click", handleClick, { capture: true });

  //   return () => {
  //     document.removeEventListener("click", handleClick, { capture: true });
  //   };
  // });

  return (
    <div
      // ref={dropRef}
      className={`dropdown ${props.class ? props.class : ""}`}
      style={{ display: `${props.dropdown ? "block" : "none"}`, left: `${props.pos === "left" ? "0" : ""}`, right: `${props.pos === "right" ? "0" : ""}` }}
    >
      {props.children}
    </div>
  );
}

export default Dropdown;
