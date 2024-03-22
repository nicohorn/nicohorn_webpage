import React from "react";

export default function SquareLoader() {
  return (
    <svg
      className="loaderContainer -translate-x-[96px]"
      height="150"
      width="150"
    >
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
  );
}
