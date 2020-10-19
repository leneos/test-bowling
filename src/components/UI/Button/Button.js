import React from "react";
import "./Button.scss";
export const Button = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.btnTitle}
    </button>
  );
};
