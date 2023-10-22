/** @format */

import React from "react";
import Image from "next/image";
import { Avatar } from "./ui/avatar";

interface Props {
  images: string[];
}

const Album: React.FC<Props> = ({ images }) => {
  return (
    <Avatar className="mt-1">
      {images.map((image, index) => (
        <Image
          key={index}
          className="object-cover"
          src={image}
          alt="Pic"
          width={20}
          height={20}
        />
      ))}
    </Avatar>
  );
};

export default Album;
