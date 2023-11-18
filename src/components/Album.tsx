/** @format */

import React from "react";
import Image from "next/image";
import { Avatar } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  className?: string;
}

const Album: React.FC<Props> = ({ images, className }) => {
  const length = images.length > 4 ? 4 : images.length;
  let grid = "";
  if (length !== 1) grid = `grid grid-rows-2 grid-cols-2`;

  const layoutClass = (idx: number): string => {
    if (length === 3) return `object-cover ${idx >= 2 && "col-span-2"}`;
    return "object-cover";
  };

  return (
    <Avatar className={cn(`mt-1 h-12 w-12 ${grid}`, className)}>
      {images.map((image, index) => (
        <Image
          key={index}
          className={layoutClass(index)}
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
