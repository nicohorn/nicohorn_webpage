import React from "react";

export default function SquareLoader() {
  return (
    <div className="-translate-x-1/2">
      <svg className="loaderContainer " height="150" width="150">
        <rect
          className="loaderTrack"
          fill="none"
          strokeWidth="5px"
          width="150"
          height="150"
        />
        <rect
          className="loaderCar"
          fill="none"
          strokeWidth="5px"
          width="150"
          height="150"
          pathLength="300"
        />
      </svg>
    </div>
  );
}
