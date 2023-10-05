import React from "react";
import LeftArrow from "../left_arrow/LeftArrow";
import RightArrow from "../right_arrow/RightArrow";

function Title({ title, showButton = true }) {
  return (
    <div className="section-title-container">
      <div className="section-title-txt">
        <h3>{title}</h3>
      </div>
      {showButton && (
        <div className="section-title-btns">
          <div className="section-btn-left">
            <LeftArrow />
          </div>
          <div className="section-btn-right">
            <RightArrow />
          </div>
        </div>
      )}
    </div>
  );
}

export default Title;
