import React, { useEffect, useState } from "react";
import LeftArrow from "../left_arrow/LeftArrow";
import RightArrow from "../right_arrow/RightArrow";

function Title({
  title,
  showButton = true,
  live = false,
  onSlideRight,
  onSlideLeft,
}) {
  const [isDim, setIsDim] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDim((dim) => !dim);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="section-title-container">
      <div className="section-title-txt">
        <h3>{title}</h3>
        {live && (
          <span className={`live-red ${isDim ? "dim" : ""}`}>&#9679;</span>
        )}
      </div>
      {showButton && (
        <div className="section-title-btns">
          <div className="section-btn-left">
            <LeftArrow onClick={onSlideLeft} />
          </div>
          <div className="section-btn-right">
            <RightArrow onClick={onSlideRight} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Title;
