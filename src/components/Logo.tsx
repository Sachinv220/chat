/** @format */
"use client";
import React from "react";
import Image, { ImageProps } from "next/image";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

const Logo = () => {
  const { theme } = useTheme();
  const props = {
    width: 90,
    height: 90,
    src: "/icon.png",
  } as const;

  if (theme === "light") {
    return <Image {...props} className="filter invert" alt="Logo" />;
  } else {
    return <Image {...props} alt="Logo" />;
  }
};

export function ToggleTheme({ className }: { className: string }) {
  const { theme, setTheme } = useTheme();
  //eslint-disable jsx-a11y/alt-text
  return (
    <Button
      variant="outline"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
      }}
      className={className}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

export function DarkImage({ ...props }: ImageProps) {
  const { theme } = useTheme();

  if (theme === "dark") {
    return <Image {...props} className="filter invert" />;
  } else {
    return <Image {...props} />;
  }
}

export default Logo;
