import React from "react";
import Image from "next/image";
import { Avatar } from "./ui/avatar";

interface Props {
  images: string[];
}

const Album: React.FC<Props> = ({ images }) => {
  return (
    <div className="grid grid-rows-2 mt-2 w-5 grid-cols-2 my-auto mr-6">
      <Avatar>
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
    </div>
  );
};

export default Album;
