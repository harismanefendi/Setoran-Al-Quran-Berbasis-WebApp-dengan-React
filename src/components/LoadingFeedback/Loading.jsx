import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

function Loading({ text }) {
  return (
    <Card className="bg-white rounded-lg p-4 mb-5 shadow-md">
      <h3 className="text-lg font-semibold mb-4">Loading {text}</h3>

      <Skeleton className="rounded-lg mb-2 w-2/4">
        <div className="h-4 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg mb-2 w-3/4">
        <div className="h-4 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg mb-2 w-2/4">
        <div className="h-4 rounded-lg bg-default-300"></div>
      </Skeleton>
      <Skeleton className="rounded-lg mb-2 w-3/4">
        <div className="h-4 rounded-lg bg-default-300"></div>
      </Skeleton>

      <div className="flex items-center space-x-2 my-1">
        <Skeleton className="rounded-full mb-2 w-1/4">
          <div className="h-7 rounded-full bg-default-300 w-1/4 mr-2"></div>
        </Skeleton>
        <Skeleton className="rounded-full mb-2 w-2/4">
          <div className="h-7 rounded-full bg-default-300 w-1/6"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg w-3/4 mb-2">
        <div className="h-4 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}

export default Loading;
