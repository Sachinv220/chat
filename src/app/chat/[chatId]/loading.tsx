import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function RandomSkeleton() {
  const align = Math.round(Math.random());

  return (
    <div className={`flex space-x-4 mt-3 ${align === 0 ? 'justify-start' : 'justify-end'}`}>
      <Skeleton className="h-8 w-8 rounded-full"></Skeleton>
      <div className="space-y-2">
        <Skeleton className="h-7 w-[250px]" />
        <Skeleton className="h-7 w-[200px]" />
      </div>
    </div>
  );
}

const NavSkeleton = () => {
  return (
    <div className="flex items-center space-x-4 w-full h-16 dark:bg-slate-900 bg-slate-100 pl-1">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex flex-col w-full min-h-full">
      <NavSkeleton />
      <div className="mt-10 px-2">
        {[...Array(10)].map((_, index) => (
          <RandomSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
