import React from "react";
import "./rating.css";

function Rating({ children }) {
  return (
    <div className="rating">
      <span className="rating-star">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.20056 5.0284L7.25124 0.897706C7.51446 0.367431 8.27503 0.367431 8.53824 0.897706L10.5889 5.0284L15.1749 5.69487C15.7633 5.78038 15.9978 6.49953 15.5718 6.91203L12.254 10.1251L13.037 14.6643C13.1376 15.2472 12.5222 15.6917 11.9957 15.4164L7.89474 13.2721L3.7938 15.4164C3.26732 15.6917 2.65192 15.2472 2.75246 14.6643L3.53546 10.1251L0.217699 6.91203C-0.208286 6.49953 0.0262278 5.78038 0.614623 5.69487L5.20056 5.0284Z"
            fill="#FFCD19"
          />
        </svg>
      </span>{" "}
      {children}
    </div>
  );
}

export default Rating;
