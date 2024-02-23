/** @format */

"use client";

import * as React from "react";

export default function useInfiniteScroll() {
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      console.log("scrolling")
      setScroll(window.scrollY === 0);
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}
