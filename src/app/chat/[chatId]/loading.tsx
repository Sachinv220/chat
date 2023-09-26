/** @format */

import React from "react";

interface SpinnerProps {
  size?: "small" | "medium" | "large";
}

const Spinner: React.FC<SpinnerProps> = ({ size = "medium" }) => {
  const spinnerSizeClasses = {
    small: "w-5 h-5",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div
      className={`border-t-4 border-blue-500 border-solid rounded-full animate-spin ${spinnerSizeClasses[size]}`}
    ></div>
  );
};

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-full">
      <Spinner size="large" />
    </div>
  );
};

export default Loading;
