import React from "react";

//Stateless Function Component

const Heart = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={props.onlike}
      aria-hidden="true"
    ></i>
  );
};

export default Heart;
