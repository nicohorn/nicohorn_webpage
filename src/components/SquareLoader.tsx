import React from "react";

export default function SquareLoader() {
  return (
    <div>
      <svg
        className="loaderContainer"
        viewBox="0 0 35 35"
        height="50"
        width="50"
      >
        <rect
          className="loaderTrack"
          x="2.5"
          y="2.5"
          fill="none"
          strokeWidth="5px"
          width="50"
          height="50"
        />
        <rect
          className="loaderCar"
          x="2.5"
          y="2.5"
          fill="none"
          strokeWidth="5px"
          width="50"
          height="50"
          pathLength="100"
        />
      </svg>

      <style></style>
    </div>
  );
}
