/** @format */

import React from "react";
import Image from "next/image";
import { Avatar } from "./ui/avatar";

interface Props {
  images: string[];
}

const Album: React.FC<Props> = ({ images }) => {
  const length = images.length > 4 ? 4 : images.length;
  let className = "";
  if (length !== 1) className = `grid grid-rows-2 grid-cols-2`;
  return (
    <Avatar className={`mt-1 ${className}`}>
      {images.map((image, index) => (
        <Image
          key={index}
          className={`object-cover ${index >= 2 ? "col-span-2" : ""}`}
          src={image}
          alt="Picture"
          width={100}
          height={100}
        />
      ))}
    </Avatar>
  );
};

export default Album;
