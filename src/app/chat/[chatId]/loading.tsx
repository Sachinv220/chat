/** @format */

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function RandomSkeleton() {
  const align = Math.round(Math.random());
  return (
    <div className={`flex items-center space-x-4 mt-3 ${align && "ml-auto"}`}>
      <Skeleton className="h-12 w-12 rounded-full" /> 
      <div className="space-y-2">
        <Skeleton className="h-7 w-[250px]" />
        <Skeleton className="h-7 w-[200px]" />
      </div>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex flex-col w-full min-h-full px-3">
      {[...Array(10)].map((_, index) => (
        <RandomSkeleton key={index} />
      ))}
    </div>
  );
};

export default Loading;
