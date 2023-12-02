/** @format */
"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();
  return (
    <Image
      width={90}
      height={90}
      src="/icon.png"
      
      className={theme === "light" ? "filter brightness-0" : ""}
      alt="Logo"
    />
  );
};

export default Logo;
