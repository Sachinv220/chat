/** @format */

"use client";

import * as React from "react";

export default function usePaginate() {
  const [scroll, setScroll] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY === 0);
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scroll;
}
