import React from "react";

const Box = (props) => {
  const resultClass = props.result ? props.result : "";

  return (
    // 클래스 하나 더 추가. 변하는 값이 들어갔으므로 "" 대신 {} 로 감싼다
    <div className={`box ${resultClass}`}>
      <h1>{props.title}</h1>
      <img src={props.item.img} className="item-img" />
      <h2>{props.result}</h2>
    </div>
  );
};

export default Box;
