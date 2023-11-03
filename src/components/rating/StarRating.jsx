import React, { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

StarRating.prototype = {
  maxRating: PropTypes.number,
  size: PropTypes.number,
  color: PropTypes.string,
};

function StarRating({
  maxRating = 10,
  color = "#fcc419",
  size = 28,
  rating,
  onRate,
}) {
  const [temprating, setTempRating] = useState(0);

  return (
    <div className="result-detail-star-rating">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          color={color}
          size={size}
          full={temprating ? temprating >= i + 1 : rating >= i + 1}
          onHoverIn={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
          onRate={() => onRate(i + 1)}
        />
      ))}
    </div>
  );
}

export default StarRating;
